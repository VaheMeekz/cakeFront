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
import {useTranslation} from "react-i18next";
import {FaFacebookF} from "react-icons/fa";
import {FiInstagram} from "react-icons/fi";

const Footer = () => {

    const {t} = useTranslation();

    const contactUsData = useSelector(state => state.productReducer.contactsGet);

    const profileType = useSelector(state => state.productReducer.profileType)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(contactsData())
    }, [])

    const clickToUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        });
    }

    return (
        <div>
            <div className={css.footerMain}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={4} lg={4} xs={12}>
                            <div className={css.col}>
                                <h1>LOGO</h1>
                                <p>The production of COMPANY is distinguished by elegant taste and great design</p>
                                <div>
                                    {
                                        contactUsData?.map((item) => {
                                            return (
                                                <i className={css.icons}>
                                                    <a href={`${item.facebook}`} target={"_blank"} className={css.tel}>
                                                        <i>
                                                            <AiFillFacebook/>
                                                        </i>
                                                    </a></i>
                                            )
                                        })
                                    }
                                    {
                                        contactUsData?.map((item) => {
                                            return (
                                                <i className={css.icons}>
                                                    <a href={`${item.instagram}`} target={"_blank"} className={css.tel}>
                                                        <i>
                                                            <FiInstagram/>
                                                        </i>
                                                    </a></i>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Col>
                        <Col md={4} lg={4} xs={12}>
                            <div className={css.colLi}>
                                <h2>{t('Information')}</h2>
                                <ul>
                                    {
                                        profileType?.length ?
                                            <li><Link onClick={clickToUp} to={'/profile'}>{t("Myprofile")}</Link></li>
                                            : null
                                    }
                                    <li><Link onClick={clickToUp} to={'/delivary'}>{t("delivary")}</Link></li>
                                    <li><Link onClick={clickToUp} to='/terms'>{t("Termsandconditions")}</Link></li>
                                    <li onClick={clickToUp}>{t("PrivacyPolicy")}</li>
                                </ul>
                            </div>
                        </Col>
                        <Col md={4} lg={4} xs={12}>
                            <div className={css.colLi}>
                                <h2>{t("ContactInfo")}</h2>
                                {
                                    contactUsData?.map((item, index) => {
                                        return (
                                            <ul key={index}>
                                                <li onClick={clickToUp}><i><GoLocation/></i>{item.location}</li>
                                                <li>
                                                    <a onClick={clickToUp} href={`tel:${item.phone}`}>
                                                        <i>
                                                            <BsTelephone/>
                                                        </i>
                                                        {item.phone}
                                                    </a>
                                                </li>
                                                <li><a onClick={clickToUp} href={`mailto:${item.email}`}>
                                                    <i>
                                                        <AiOutlineMail/>
                                                    </i>
                                                    {item.email}
                                                </a></li>
                                            </ul>
                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
            <div className={css.bottomBox}>
                <div>ARMCODING</div>
            </div>
        </div>
    );
};

export default Footer;