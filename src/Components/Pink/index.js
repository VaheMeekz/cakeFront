import React, {useState} from 'react';
import css from './pink.module.css'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {contactPost, subscriberPost} from "../../Store/actions/productActions";
import {useDispatch, useSelector} from "react-redux";
import {productReducer} from "../../Store/reducers/productReducer";
import { Formik } from 'formik';
import Swal from 'sweetalert2'

const Pink = () => {

    const subscribeError = useSelector(state => state.productReducer.subscribe);


    const [validated, setValidated] = useState(false);
    const [subscriber, setSubscriber] = useState({name: ''})

    const dispatch = useDispatch();


    const handleChange = (e) => {
        subscriber["email"] = e.target.value;
        setSubscriber(subscriber)
    }

    return (
        <div className={css.pink}>
            <Container>
                <Row>
                    <Col lg={5} md={6} xs={12}>
                        <div className={css.bhText}>
                            <p>Lorem ipsum dolor sit amet, consectetur </p>
                        </div>
                    </Col>
                    <Col lg={7} md={6} xs={12}>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Requerid!',
                                    });
                                    errors.email = ''
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    dispatch(subscriberPost(subscriber))
                                    setSubmitting(false);
                                    values.email= ''
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Email Success',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
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
                                <form onSubmit={handleSubmit} onChange={handleChange}>
                                    <div className={css.bhInput}>
                                        <div className={css.inp}>
                                            <input
                                                type="email"
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />
                                        </div>
                                        <div className={css.bhBtn}>
                                            <button type="submit" disabled={isSubmitting}>
                                                Subscribe
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Pink;