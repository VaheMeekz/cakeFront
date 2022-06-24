import React, {useEffect, useState} from 'react';
import {Button, Container, Row} from "react-bootstrap";
import css from './cart.module.css';
import idramSvg from '../../Images/idram.svg';
import {Formik} from 'formik';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {deleveryDataGet} from "../../Store/actions/productActions";
import * as Yup from "yup";
import Input from "./Input";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const validateSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(5, 'Must be 5-15 characters or less')
        .max(15, 'Must be 5-15 characters or less')
        .required('Required'),
    lastName: Yup.string()
        .min(5, 'Must be 5-20 characters or less')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    location: Yup.string()
        .min(5, 'Must be 5-15 characters or less')
        .max(15, 'Must be 5-15 characters or less')
        .required('Required'),
    subject: Yup.string()
        .min(5, 'Must be 5-15 characters or less')
        .max(15, 'Must be 5-15 characters or less')
        .required('Required'),
    home: Yup.string()
        .min(5, 'Must be 5-15 characters or less')
        .max(15, 'Must be 5-15 characters or less')
        .required('Required'),
});

const secondValidate = Yup.object().shape({
    firstName: Yup.string()
        .min(5, 'Must be 5-15 characters or less')
        .max(15, 'Must be 5-15 characters or less')
        .required('Required'),
    lastName: Yup.string()
        .min(5, 'Must be 5-20 characters or less')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    location: Yup.string()
        .min(5, 'Must be 5-15 characters or less')
        .max(15, 'Must be 5-15 characters or less')
        .required('Required'),
    message: Yup.string()
        .min(5, 'Must be 5-15 characters or less')
        .max(500, 'Must be 5-15 characters or less')
        .required('Required'),
});

const Cart = ({basketData}) => {

    const {t} = useTranslation();

    const deleveryValueData = useSelector(state => state.productReducer.deleveryValue);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch((deleveryDataGet()))
    }, []);

    let tot = basketData?.map(i => i.total)

    const [total, setTotal] = useState(Number(tot))

    const [isDisabled, setIsDisabled] = useState(true);

    const handleClick = () => {
        setIsDisabled(!isDisabled)
    };

    return (
        <div className={css.main}>
            <Container>
                <Row>
                    <div className={css.divTwo}>
                        <h2>{t("Getintouch")}</h2>
                        <Formik
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                phoneNumber: "",
                                location: "",
                                email: "",
                                subject: "",
                                home: "",
                            }}
                            validate={validateSchema}
                            onSubmit={(values, {setSubmitting}) => {
                                setTimeout(() => {
                                    console.log(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }, 400);
                            }}
                        >
                            {({
                                  values, errors, touched, handleChange, handleBlur, handleSubmit,
                              }) => (
                                <form onSubmit={handleSubmit} >
                                    <div>
                                        <div className={css.nameInp}>
                                            <div>
                                                <label htmlFor="firstName">{t("FirstName")}</label>
                                                <Input name={"firstName"} type={"text"}/>
                                            </div>

                                            <div>
                                                <label htmlFor="lastName">{t("LastName")}</label>
                                                <Input name={"lastName"} type={"text"}/>
                                            </div>
                                        </div>
                                        <div className={css.divInp}>
                                            <label htmlFor="phone">{t("Phone")}</label><br/>
                                            <Input name={"phoneNumber"} type={"number"}/>
                                        </div>
                                        <div className={css.divInp}>
                                            <label htmlFor="email">{t("Email")}</label><br/>
                                            <Input name={"email"} type={"email"}/>
                                        </div>
                                        <div className={css.divInp}>
                                            <label htmlFor="address">{t("Streetaddress")}</label><br/>
                                            <Input name={"location"} type={"text"}/>
                                        </div>
                                        <div className={css.divInp}>
                                            <label htmlFor="Subject">{t("Subject")}</label><br/>
                                            <Input name={"subject"} type={"text"}/>
                                        </div>
                                        <div className={css.divInp}>
                                            <label htmlFor="Apartment">{t("Apartmentsuiteunit")}</label><br/>
                                            <Input name={"home"} type={"text"}/>
                                        </div>
                                        <div className={css.divInp}>
                                            <label htmlFor="State">{t("State")}</label> <br/>
                                            <select name="State" id="State">
                                                {
                                                    deleveryValueData?.map((item) => {
                                                        return (
                                                            <option value="volvo">
                                                                <span>{item.loacation}-{item.price}</span>
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <Button variant="primary" type="submit">
                                            {t("Send")}
                                        </Button>
                                    </div>
                                    <div className={css.btnDiv}>

                                    </div>
                                </form>
                            )}
                        </Formik>
                        <div>
                            <Formik
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    location: "",
                                    message: "",
                                }}
                                validate={secondValidate}
                                onSubmit={(values, {setSubmitting}) => {
                                    setTimeout(() => {
                                        console.log(JSON.stringify(values, null, 2));
                                        setSubmitting(false);
                                    }, 400);
                                }}
                            >
                                {({
                                      values, errors, touched, handleChange, handleBlur, handleSubmit,
                                  }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className={css.ship}>
                                            <label className={css.checkbox}>
                                                <input
                                                    type="checkbox"
                                                    name="Apartment"
                                                    id="check1"
                                                    onChange={handleClick}
                                                    onBlur={handleBlur}
                                                />
                                                <span>{t("ShipToADifferentAddress")}</span>
                                            </label>
                                        </div>
                                        {/*.............................................,,,,,,,,,,,,,,,,*/}
                                        <div className={`${isDisabled ? css.opac : null}`}>
                                            <div className={css.nameInp}>
                                                <div>
                                                    <label htmlFor="firstName">{t("FirstName")}</label><br/>
                                                    <Input name={"firstName"} type={"text"}/>
                                                </div>
                                                <div>
                                                    <label htmlFor="lastName">{t("LastName")}</label><br/>
                                                    <Input name={"lastName"} type={"text"}/>
                                                </div>
                                            </div>
                                            <div className={css.divInp}>
                                                <label htmlFor="address">{t("Streetaddress")}</label><br/>
                                                <Input name={"location"} type={"text"}/>
                                            </div>
                                            <div className={css.divInp}>
                                                <label htmlFor="Apartment">{t("Apartmentsuiteunit")}</label><br/>
                                                <input
                                                    type="text"
                                                    name="Apartment"
                                                    id="Apartment"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                    disabled={isDisabled}
                                                />
                                            </div>
                                            <div className={css.divInp}>
                                                <label htmlFor="State">{t("State")}</label> <br/>
                                                <select name="State" id="State" disabled={isDisabled}>
                                                    {
                                                        deleveryValueData?.map((item) => {
                                                            return (
                                                                <option value="volvo">
                                                                    <span>{item.loacation}-{item.price}</span>
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className={css.divInpTexterea}>
                                                <label htmlFor="Notes">{t("Notes")}</label><br/>
                                                <input
                                                    type="text"
                                                    name="Notes"
                                                    id="Notes"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                    disabled={isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </form>)}
                            </Formik>
                        </div>

                    </div>
                    <div className={css.byDiv}>
                        {
                            basketData?.map((item) => {
                                return (
                                    <div>
                                        <h2>Your order</h2>
                                        <h5>Product</h5>
                                        <div className={css.byDIvBorder}>
                                            <div>
                                                <p>{item.productName}</p>
                                                <h6>{item.count}</h6>
                                                <h6>{item.total} AMD</h6>
                                            </div>
                                        </div>
                                        <h3>{t("TOTAL")} {total} AMD</h3>
                                    </div>
                                )
                            })
                        }
                        <div className={css.payment}>
                            <h5>{t("Paymenttype")}</h5>
                            <div>
                                <input type="radio" id="html" name="fav_language" value="HTML"/>
                                <label htmlFor="html">{t("Onlinepayment")}</label>
                                <input type="radio" id="html2" name="fav_language" value="HTML"/>
                                <label htmlFor="html2">{t("Cashondelivery")}</label>
                            </div>
                            <img src={idramSvg} alt="image"/>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default Cart;