import React, {useEffect, useState} from 'react';
import css from './header.module.css';
import {AiOutlineHeart, AiOutlineSearch} from "react-icons/ai";
import {BsCart3} from "react-icons/bs";
import {FaFacebookF} from "react-icons/fa";
import {FiInstagram} from "react-icons/fi";
import {Col, Container, Nav, Navbar, NavLink, Accordion, Dropdown} from "react-bootstrap";
import {privatePAge} from "../../Config/routes.index";
import {Link, useParams, useSearchParams, useLocation} from "react-router-dom";
import homeBg from '../../Images/homebg.png'
import {GoLocation} from 'react-icons/go'
import {BsTelephone} from 'react-icons/bs'
import {AiOutlineMail} from 'react-icons/ai'
import {useDispatch, useSelector} from "react-redux";
import {
    aboutBannerUs, basketBannerData,
    basketPost, contactsData, detailBannerData,
    homeBannerGet,
    langGet, productBanner, profileGet,
    signUpPost, wishBanner,
    wishPost
} from "../../Store/actions/productActions";
import cookies from 'js-cookie'
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import Cookies from 'js-cookie'
import Slider from "react-slick";
import profile from '../../Images/profile.svg'


const Header = () => {

    const wishData = useSelector(state => state.productReducer.wish);
    const langValue = useSelector(state => state.productReducer.lang)
    const profileType = useSelector(state => state.productReducer.profileType)
    const basketData = useSelector(state => state.productReducer.basket);
    const homeBannerData = useSelector(state => state.productReducer.homeBanner);
    const aboutBannerData = useSelector(state => state.productReducer.aboutBanner);
    const productBannerData = useSelector(state => state.productReducer.productBanner);
    const wishBannerData = useSelector(state => state.productReducer.wishBanner);
    const basketMAinBannerData = useSelector(state => state.productReducer.productBanner);
    const detailMainBannerData = useSelector(state => state.productReducer.productBanner);
    const contactUsData = useSelector(state => state.productReducer.contactsGet);

    const bannerImage = homeBannerData?.map((item) => {
        return item.image.split(',').map(i => i)
    })


    useEffect(() => {
        dispatch(signUpPost())
        dispatch(homeBannerGet())
        dispatch(aboutBannerUs())
        dispatch(productBanner())
        dispatch(wishBanner())
        dispatch(basketBannerData())
        dispatch(detailBannerData())
        dispatch(contactsData())
    }, [])

    const [bas, setBas] = useState()
    const [wish, setWish] = useState()

    useEffect(() => {
        setBas(basketData?.length)
    }, [basketData])

    useEffect(() => {
        setWish(wishData?.length)
    }, [wishData])

    const dispatch = useDispatch();

    const {pathname} = useLocation();

    const {id} = useParams();

    const languages = [
        {id: 1, lang: 'en'},
        {id: 2, lang: 'am'},
        {id: 3, lang: 'ru'},
    ]

    const currentLang = cookies.get('i18next')
    const [activeLang, setActiveLang] = useState(currentLang)

    const selectLange = (e) => {
        i18next.changeLanguage(e.target.value)
        localStorage.setItem('language', e.target.value)
        setActiveLang(e.target.value)
        dispatch(langGet(e.target.value))
    }

    const {t} = useTranslation()

    useEffect(() => {
        // window.scrollTo(0, 0)
        if (JSON.parse(localStorage.getItem("basketProduct"))) {
            let arr = [];
            JSON.parse(localStorage.getItem("basketProduct")).forEach(i => {
                arr.push(i);
            });
            dispatch(basketPost(arr))
        }
        dispatch(langGet(localStorage.getItem("language")))
    }, []);

    useEffect(() => {
        // window.scrollTo(0, 0)
        let valMain = []
        if (JSON.parse(localStorage.getItem("Auth"))) {
            valMain.push(JSON.parse(localStorage.getItem("Auth")))
        }
        dispatch(profileGet(valMain))
    }, []);

    useEffect(() => {
        // window.scrollTo(0, 0)
        if (JSON.parse(localStorage.getItem("wishList"))) {
            let arr = [];
            JSON.parse(localStorage.getItem("wishList")).forEach(i => {
                arr.push(i);
            });
            dispatch(wishPost(arr));
        }
    }, []);


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 3
    };

    console.log(bannerImage[0],'++++++++++++++++++++++++')

    return (
        <div>
            <div className={css.headerMainOne}>

                {
                    contactUsData?.map((item) => {
                        return (
                            <div className={css.headerOne}>
                                <span>
                                    <i><BsTelephone/></i>
                                    <p>{item.phone}</p>
                                </span>
                                            <span>
                                    <i><AiOutlineMail/></i>
                                    <p>{item.email}</p>
                                </span>
                                <div className={css.headerIcons}>
                                    <i><FaFacebookF/></i>
                                    <i><FiInstagram/></i>
                                </div>
                            </div>
                        )
                    })
                }


                <div>
                    <div className={css.headerRight}>
                        <div>
                            <span>{bas}</span>
                            <Link to="/basket"><BsCart3/></Link>
                        </div>
                        <div>
                            <span>{wish}</span>
                            <Link to="/wish"><AiOutlineHeart/></Link>
                        </div>
                        <select id="cars" onChange={selectLange}>
                            {
                                languages.map(({id, lang}) => {
                                    return <option
                                        key={id}
                                        name={lang}
                                        value={lang}
                                        className={lang === activeLang ? 'language active' : 'language'}
                                    >
                                        {lang}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                </div>


            </div>


            <div className={css.headerTwo}>
                <Navbar collapseOnSelect expand="lg" variant="dark">
                    <Container fluid>
                        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                <div className={css.main}>
                                    <div className={css.mainHome}>
                                        <div className={css.headOne}>
                                            <Link to="/">{t('home')}</Link>
                                            <Link to="/about">{t('about')}</Link>
                                            <Link to="/product">{t('product')}</Link>
                                            <Link to="/delivary">{t('delivary')}</Link>
                                            <Link to="/contact_us">{t('contacts')}</Link>
                                        </div>
                                        <div>
                                            {
                                                profileType?.length > 0 ?
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                            <img src={profile} alt=""/>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item href="/log_in">Login</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                    :
                                                    <button className={css.btn}><Link to='/log_in'>{t("login")}</Link>
                                                    </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Nav>
                        </Navbar.Collapse>


                    </Container>
                </Navbar>
            </div>
            <div>
                {
                    pathname == '/' ? <Slider {...settings}>
                        {
                            bannerImage[0]?.map((item) => {
                                return (
                                    <div className={css.zDIv}>
                                        <img src={item} alt=""/>
                                        <div className={css.homeOne}>
                                            {
                                                homeBannerData?.map((item) => {
                                                    return (
                                                        <div className={css.homeTwo}>
                                                            <h1>
                                                                {langValue == 'en' ? item.titleEn
                                                                    : langValue == 'ru' ? item.titleRu
                                                                        : langValue == 'am' ? item.titleHy : null}
                                                            </h1>
                                                            <p>
                                                                {langValue == 'en' ? item.subTitleEn
                                                                    : langValue == 'ru' ? item.subTitleRu
                                                                        : langValue == 'am' ? item.subTitleHy : null}
                                                            </p>
                                                            <button>Button</button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider> : pathname == '/about' ? aboutBannerData?.map((item) => {
                        return (
                            <div className={css.zDIv}>
                                <img src={item.image} alt=""/>
                                <div className={css.homeOne}>
                                    <div className={css.homeTwo}>
                                        <h1>{langValue == 'en' ? item.titleEn
                                            : langValue == 'ru' ? item.titleRu
                                                : langValue == 'am' ? item.titleHy : null}</h1>
                                        <p>{langValue == 'en' ? item.subTitleEn
                                            : langValue == 'ru' ? item.subTitleRu
                                                : langValue == 'am' ? item.subTititleHy : null}</p>
                                        <button>Button</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : pathname == '/product' ? productBannerData?.map((item) => {
                        return (
                            <div className={css.zDIv}>
                                <img src={item.image} alt=""/>
                                <div className={css.homeTextMain}>
                                    <div className={css.homeText}>
                                        <h1>{langValue == 'en' ? item.titleEn
                                            : langValue == 'ru' ? item.titleRu
                                                : langValue == 'am' ? item.titleHy : null}</h1>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : pathname == '/wish' ? wishBannerData?.map((item) => {
                        return (
                            <div className={css.zDIv}>
                                <img src={item.image} alt=""/>
                                <div className={css.homeTextMain}>
                                    <div className={css.homeText}>
                                        <h1>{langValue == 'en' ? item.titleEn
                                            : langValue == 'ru' ? item.titleRu
                                                : langValue == 'am' ? item.titleHy : null}</h1>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : pathname == '/basket' ? basketMAinBannerData?.map((item) => {
                        return (
                            <div className={css.zDIv}>
                                <img src={item.image} alt=""/>
                                <div className={css.homeTextMain}>
                                    <div className={css.homeText}>
                                        <h1>{langValue == 'en' ? item.titleEn
                                            : langValue == 'ru' ? item.titleRu
                                                : langValue == 'am' ? item.titleHy : null}</h1>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : pathname == `/product/${id}` ? detailMainBannerData?.map((item) => {
                        return (
                            <div className={css.zDIv}>
                                <img src={item.image} alt=""/>
                                <div className={css.homeTextMain}>
                                    <div className={css.homeText}>
                                        <h1>{langValue == 'en' ? item.titleEn
                                            : langValue == 'ru' ? item.titleRu
                                                : langValue == 'am' ? item.titleHy : null}</h1>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : null
                }

            </div>


        </div>
    );
};

export default Header;