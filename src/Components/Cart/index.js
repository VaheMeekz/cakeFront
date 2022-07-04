import React, {useEffect} from 'react';
import {Button, Container} from "react-bootstrap";
import css from './cart.module.css';
import idramSvg from '../../Images/idram.svg';
import cart from '../../Images/masterCart.svg';
import {Formik} from 'formik';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {deleveryGetValue} from "../../Store/actions/productActions";
import * as Yup from "yup";
import Input from "./Input";
import axios from "axios";
import keys, {token} from "../../keys";
import Form from 'react-bootstrap/Form'
import {useNavigate} from "react-router-dom";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const validateSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Must be 5-15 characters or less')
        .max(15, 'Must be 5-15 characters or less')
        .required('Required'),
    lastName: Yup.string()
        .min(5, 'Must be 5-20 characters or less')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .min(5, 'Must be 5-20 characters or less')
        .max(20, 'Must be 20 characters or less'),
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
    deliver:Yup.string().required("Deliver is required!"),
});


const Cart = ({basketData, pay}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {t} = useTranslation();
    useEffect(() => {
        dispatch((deleveryGetValue()))
    }, []);
    const deleveryValueData = useSelector(state => state.productReducer.deleveryValue);
    let userToken =token && token !== null ? JSON.parse(token)?.token : null
    let userId = token && token !== null ? JSON.parse(token)?.id : null
    return (<div className={css.main}>
        <h2>{t("Getintouch")}</h2>

        <Container>
            <div className={css.mainBox}>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        phoneNumber: "",
                        email: "",
                        location: "",
                        subject: "",
                        home: "",
                        deliver:"",
                        paymentType:""
                    }}
                    validationSchema={validateSchema}
                    onSubmit={(values) => {
                        if(values.paymentType == ""){
                            axios.post(`${keys.baseURI}/orders/`, {
                                user_id: userId,
                                product_id: "",
                                firstName: values.firstName,
                                lastName: values.lastName,
                                email: values.email,
                                phone: values.phoneNumber,
                                addres: values.location,
                                apartament: values.subject,
                                delevery: values.deliver,
                                productDescription: "",
                                paymentType: 1,
                                deleveryDate: "",
                                deleveryTime: "",

                            }, {
                                headers: {
                                    'Authorization': `Bearer ${userToken}`
                                }})
                                .then(function (response) {
                                    console.log(response);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        }else if(values.paymentType == "2"){
                            axios.post(`${keys.baseURI}/orders/`, {
                                user_id: userId,
                                product_id: "2",
                                firstName: values.firstName,
                                lastName: values.lastName,
                                email: values.email,
                                phone: values.phoneNumber,
                                addres: values.location,
                                apartament: values.subject,
                                delevery: values.deliver,
                                productDescription: "",
                                paymentType: 2,
                                deleveryDate: "",
                                deleveryTime: "",

                            }, {
                                headers: {
                                    'Authorization': `Bearer ${userToken}`
                                }})
                                .then(function (response) {
                                    console.log(response.data,"+++++++++++++++++++++++++++++++++++++");
                                    navigate(`/result/${response.data.payment_id}`)
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        }else if(values.paymentType == "3"){
                            axios.post(`${keys.baseURI}/orders/`, {
                                user_id: userId,
                                product_id: "",
                                firstName: values.firstName,
                                lastName: values.lastName,
                                email: values.email,
                                phone: values.phoneNumber,
                                addres: values.location,
                                apartament: values.subject,
                                delevery: values.deliver,
                                productDescription: "",
                                paymentType: 3,
                                deleveryDate: "",
                                deleveryTime: "",

                            }, {
                                headers: {
                                    'Authorization': `Bearer ${userToken}`
                                }})
                                .then(function (response) {
                                    console.log(response);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        }
                    }}>
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                      }) => (<form onSubmit={handleSubmit}>
                        <Input name={"firstName"} type={"text"}
                               label={"First Name"}/>
                        <Input name={"lastName"} type={"text"}
                               label={"Last Name"}/>
                        <Input name={"phoneNumber"} type={"text"}
                               label={"Phone Number"}/>
                        <Input name={"email"} type={"email"} label={"Email"}/>
                        <Input name={"location"} type={"text"}
                               label={"Location"}/>
                        <Input name={"subject"} type={"text"}
                               label={"subject"}/>
                        <Input name={"home"} type={"text"}
                               label={"Home"}/>
                        <Form.Select  onChange={handleChange}
                                      onBlur={handleBlur}
                                        name="deliver"
                                    className={css.select}>
                            {
                                deleveryValueData?.map(i=>{
                                    return (
                                        <option value={i.price} key={i.id}>{i.loacation}</option>
                                    )
                                })
                            }
                        </Form.Select>
                        {errors.deliver && <div className="input-feedback">{errors.color}</div>}

                        {
                            userToken ? (
                                <div className={css.payment}>
                                    <div className={css.byDiv}>
                                        <h5>{t("Paymenttype")}</h5>
                                        <div className={css.select_slice}>
                                            <div onChange={handleChange}>
                                                <input type="radio" value="2" name="paymentType" />
                                                    <img src={idramSvg} alt="image"/>
                                                <input type="radio" value="3" name="paymentType" />
                                                    <img src={cart} alt="image"/>
                                                {
                                                    values.paymentType !== "" && <button type="submit" className={css.subBtnPay}>Pay</button>
                                                }
                                            </div>
                                            <div>
                                                <button type="submit" className={css.subBtn}>Cash on delivery</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h4>grancvel gnman hamar</h4>
                                </div>
                            )
                        }

                    </form>)}

                </Formik>
            </div>

        </Container>
    </div>);
};

export default Cart;