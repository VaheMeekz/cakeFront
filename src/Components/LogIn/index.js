import React, {useEffect, useState} from 'react';
import css from './login.module.css';
import {Col, Container, Row} from "react-bootstrap";
import chefWoman from '../../Images/chefWomen.png';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginPost, signUpPost} from "../../Store/actions/productActions";
import {Formik} from 'formik';
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";

const LogIn = () => {

    const {t} = useTranslation();

    let navigate = useNavigate();

    const loginError = useSelector(state => state.productReducer.loginErr);

    const [loginData, setLoginData] = useState({})

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loginPost())
    }, [])

    const handleChangeForm = (e) => {
        loginData[e.target.name] = e.target.value;
        setLoginData(loginData)
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
                                        <h1>{t("Login")}</h1>
                                        <img src={chefWoman} alt=""/>
                                    </div>
                                    <h2>{t("Welcomebackto")}<span>{t("Companyname")}</span></h2>
                                </div>
                                <Formik
                                    initialValues={{email: '', password: ''}}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.email) {
                                            errors.email = Swal.fire({
                                                icon: 'error',
                                                title: 'Oops...',
                                                text: 'Requerid!',
                                            });
                                            errors.email = ''
                                        } else if (!values.password) {
                                            errors.password = 'Required';
                                        } else if (
                                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                        ) {
                                            errors.email = `${t("Invalidemailaddress")}`;
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, {setSubmitting}) => {
                                        setTimeout(() => {
                                            dispatch(loginPost(loginData))
                                            if (loginError == undefined) {
                                                navigate('/')
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
                                                type="email"
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />
                                            <span
                                                className={css.err}>{errors.email && touched.email && errors.email}</span>
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
                                                <Link to='/contact'>{t("ForgetPassword")}</Link>
                                            </div>
                                            <button className={css.btnDiv} type="submit" disabled={isSubmitting}>
                                                {t("Login")}
                                            </button>
                                            <div className={css.started}>
                                                <span>{t("Donthaveanaccount")}</span>
                                                <Link to='/sign_up'>{t("GetStarted")}</Link>
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

export default LogIn;