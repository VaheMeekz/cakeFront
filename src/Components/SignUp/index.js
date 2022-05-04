import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import css from "../LogIn/login.module.css";
import chefWoman from "../../Images/chefWomen.png";
import {Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signUpPost} from "../../Store/actions/productActions";
import Swal from "sweetalert2";
import {Formik} from "formik";
import {useTranslation} from "react-i18next";

const SignUp = () => {

    const {t} = useTranslation();

    let navigate = useNavigate();

    const statusCode = useSelector(state => state.productReducer.statusCode);

    useEffect(() => {
        dispatch(signUpPost())
    },[])

    const [dataSignUp, setDataSignUp] = useState({})

    const dispatch = useDispatch();

    const handleChangeForm = (e) => {
        dataSignUp[e.target.name] = e.target.value;
        setDataSignUp(dataSignUp)
    }

    return (
        <div>
            <Container>
                <Row className='m-5'>
                    <Col lg={12} md={12} xs={12}>
                        <div className={css.mainDiv}>
                            <div className={css.divForm}>
                                <div className={css.divText}>
                                    <div className={css.mediaImg}>
                                        <h1>{t("SignUp")}</h1>
                                        <img src={chefWoman} alt=""/>
                                    </div>
                                    <h2>{t("Welcomebackto")}<span>{t("Companyname")}</span></h2>
                                </div>
                                <Formik
                                    initialValues={{email: '', password: '', name: ''}}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.email) {
                                            errors.email = Swal.fire({
                                                icon: 'error',
                                                title: 'Oops...',
                                                text: 'Requerid!',
                                            });
                                            errors.email = ''
                                        } else if(!values.name) {
                                            errors.name = 'Requerid!'
                                        }
                                        else if (!values.password) {
                                            errors.password = 'Required';
                                        } else if (
                                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                        ) {
                                            errors.email = 'Invalid email address';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, {setSubmitting}) => {
                                        setTimeout(() => {
                                            dispatch(signUpPost(dataSignUp))
                                            if(statusCode == 200) {
                                                navigate('/log_in')
                                            }
                                            values.email= ''
                                            values.password= ''
                                            Swal.fire({
                                                position: 'center',
                                                icon: 'success',
                                                title: 'Email Success',
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                            setSubmitting(false);
                                        }, 400);
                                    }}
                                >
                                    {({
                                          values,
                                          errors,
                                          touched,
                                          handleChange,
                                          handleBlur,
                                          handleSubmit,
                                          isSubmitting,
                                      }) => (
                                        <form onSubmit={handleSubmit} onChange={handleChangeForm}
                                              className={css.formDiv}>
                                            <input
                                                type="text"
                                                name="name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                            />
                                            <span
                                                className={css.err}>{errors.name && touched.name && errors.name}
                                            </span>
                                            <input
                                                type="email"
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />
                                            <span
                                                className={css.err}>{errors.email && touched.email && errors.email}
                                            </span>
                                            <input
                                                type="password"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            <span className={css.err}>
                                            {errors.password && touched.password && errors.password}
                                            </span>
                                            <div className={css.forgetDiv}>
                                                <label className={css.checkbox}>
                                                    <input type="checkbox"/>
                                                    <span>{t("Rememberme")}</span>
                                                </label>
                                                <Link to='/contact'>Forget Password?</Link>
                                            </div>
                                            <button className={css.btnDiv} type="submit" disabled={isSubmitting}>
                                                {t("Login")}
                                            </button>
                                            <div className={css.started}>
                                                <span>Don’t have an account?</span>
                                                <Link to='/sign_up'>Get Started</Link>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>

                            <div className={css.divImg}>
                                <img src={chefWoman} alt=""/>
                                <div className={css.blur}/>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SignUp;