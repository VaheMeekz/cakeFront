import React, {useState} from 'react';
import css from './profile.module.css';
import {useTranslation} from "react-i18next";
import {Container, Row} from "react-bootstrap";
import {Formik} from "formik";

const Profile = () => {

    const {t} = useTranslation();

    const [show, setShow] = useState(false);

    const clickShow = () => {
        setShow(!show)
    };

    return (
        <div>
            <Container>
                <Row>
                    <div className={css.main}>
                        <h1>{t("Myprofile")}</h1>
                        <div>
                            <div className={css.title}>
                                <span onClick={clickShow} className={show == false ? css.active : null}>{t("Mypurchases")}</span>
                                <span onClick={clickShow} className={show == true ? css.active : null}>{t("PersonalInfo")}</span>
                            </div>

                            {
                                !show ? "Product"
                                    :
                                    <div>
                                        <h3>{t("GeneralInfo")}</h3>
                                        <Formik
                                            initialValues={{ email: '', name: '', lastName: '', phone: '' }}
                                            validate={values => {
                                                const errors = {};
                                                if (!values.email) {
                                                    errors.email = `${t("Requerid")}`;
                                                } else if(!values.name) {
                                                    errors.name = `${t("Requerid")}`;
                                                } else if(!values.lastName) {
                                                    errors.lastName = `${t("Requerid")}`;
                                                } else if(!values.phone) {
                                                    errors.phone = `${t("Requerid")}`;
                                                } else if (
                                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                                ) {
                                                    errors.email = `${t("Invalidemailaddress")}`;
                                                }
                                                return errors;
                                            }}
                                            onSubmit={(values, { setSubmitting }) => {
                                                setTimeout(() => {
                                                    alert(JSON.stringify(values, null, 2));
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
                                                  /* and other goodies */
                                              }) => (
                                                <form onSubmit={handleSubmit} className={css.formikMain}>
                                                    <div>
                                                        <label htmlFor="email">{t("Password")}</label>
                                                        <div className={css.inpFlex}>
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                placeholder={t("Password")}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.email}
                                                            />
                                                            <span>{errors.email && touched.email && errors.email}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email">{t("Newpassword")}</label>
                                                        <div className={css.inpFlex}>
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                placeholder={t("Newpassword")}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.email}
                                                            />
                                                            <span>{errors.email && touched.email && errors.email}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button type="submit" disabled={isSubmitting}>
                                                        {t("Save")}
                                                    </button>
                                                    </div>
                                                </form>
                                            )}
                                        </Formik>
                                    </div>
                            }

                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default Profile;