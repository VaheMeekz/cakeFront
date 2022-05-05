import React, {useEffect} from 'react';
import css from './footer.module.css';
import {AiFillFacebook} from 'react-icons/ai';
import {BsLinkedin} from 'react-icons/bs';
import {Col, Container, Row} from "react-bootstrap";
import {GoLocation} from 'react-icons/go'
import {BsTelephone} from 'react-icons/bs'
import {AiOutlineMail} from 'react-icons/ai'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {contactsData} from "../../Store/actions/productActions";

const Footer = () => {

    const contactUsData = useSelector(state => state.productReducer.contactsGet);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(contactsData())
    },[])

    return (
        <div className={css.footerMain}>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={6} lg={4} xs={12}>
                        <div className={css.col}>
                            <h1>LOGO</h1>
                            <p>The production of COMPANY is distinguished by elegant taste and great design</p>
                            <div>
                                <i className={css.icons}><AiFillFacebook/></i>
                                <i><BsLinkedin/></i>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={4} xs={12}>
                        <div className={css.colLi}>
                            <h2>Information</h2>
                            <ul>
                                <li>My Account</li>
                                <li>Delivery terms</li>
                                <li><Link to='/terms'>Terms and conditions</Link></li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={6} lg={4} xs={12}>
                        <div className={css.colLi}>
                            <h2>Contact Info </h2>
                            {
                                contactUsData?.map((item) => {
                                    return (
                                        <ul>
                                            <li><i><GoLocation/></i>{item.location}</li>
                                            <li><i><BsTelephone/></i>{item.phone}</li>
                                            <li><i><AiOutlineMail/></i>{item.email}</li>
                                        </ul>
                                    )
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;