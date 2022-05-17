import React, {useEffect, useState} from 'react';
import css from './header.module.css';
import {AiOutlineHeart, AiOutlineSearch} from "react-icons/ai";
import {BsCart3} from "react-icons/bs";
import {FaFacebookF} from "react-icons/fa";
import {FiInstagram} from "react-icons/fi";
import {Col, Container, Nav, Navbar, NavLink, Accordion, Dropdown} from "react-bootstrap";
import {Link, useParams, useSearchParams, useLocation} from "react-router-dom";
import {BsTelephone} from 'react-icons/bs'
import {AiOutlineMail} from 'react-icons/ai'
import {useDispatch, useSelector} from "react-redux";
import {
    aboutBannerUs, basketBannerData,
    basketPost, contactsData, deleveryFooter, detailBannerData,
    homeBannerGet,
    langGet, productBanner, profileGet,
    signUpPost, wishBanner,
    wishPost
} from "../../Store/actions/productActions";
import cookies from 'js-cookie'
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import Slider from "react-slick";
import profile from '../../Images/profile.svg'
import {MdArrowBackIosNew, MdArrowForwardIos} from "react-icons/md";
import logoMain from '../../Images/logoMain.png'


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
    const deleveryData = useSelector(state => state.productReducer.delevery_footer_get);


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
        dispatch(deleveryFooter())
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
    }, []);

    useEffect(() => {
        dispatch(langGet(localStorage.getItem("language")))
    }, [])

    useEffect(() => {
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

    const NextArrow = (props) => {
        const {onClick} = props;
        return (
            <div className={css.nextArrow} onClick={onClick}>
                <MdArrowBackIosNew/>
            </div>
        );
    };

    const PrevArrow = (props) => {
        const {onClick} = props;
        return (
            <div className={css.prevArrow} onClick={onClick}>
                <MdArrowForwardIos/>
            </div>
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <PrevArrow/>,
        prevArrow: <NextArrow/>,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
        cssEase: "linear"
    };

    const removeLocalStorage = () => {
        localStorage.removeItem("Auth");
    }

    const [closeNav, setCloseNav] = useState(false)

    const clickToUp = () => {
        setCloseNav(false)
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        });
    }

    return (
        <div>
            <div className={css.headerFixed}>

                <div className={css.headerMainOne}>
                    {
                        contactUsData?.map((item, index) => {
                            return (
                                <div className={css.headerOne} key={index}>
                                <span>
                                     <a href={`tel:${item.phone}`} className={css.tel}>
                                                    <i>
                                                        <BsTelephone/>
                                                    </i>
                                         {item.phone}
                                                </a>
                                </span>
                                    <span>
                                    <a href={`mailto:${item.email}`} target={"_blank"} className={css.tel}>
                                                    <i>
                                                        <AiOutlineMail/>
                                                    </i>
                                        {item.email}
                                                </a>
                                </span>
                                    <div className={css.headerIcons}>

                                        {
                                            contactUsData?.map((item) => {
                                                return (
                                                    <i>
                                                        <a href={`${item.facebook}`} target={"_blank"}
                                                           className={css.tel}>
                                                            <i>
                                                                <FaFacebookF/>
                                                            </i>
                                                        </a></i>
                                                )
                                            })
                                        }
                                        {
                                            contactUsData?.map((item) => {
                                                return (
                                                    <i>
                                                        <a href={`${item.instagram}`} target={"_blank"}
                                                           className={css.tel}>
                                                            <i>
                                                                <FiInstagram/>
                                                            </i>
                                                        </a></i>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }


                    <div>
                        <div className={css.headerRight}>
                            <div>
                                {
                                    basketData?.length ? <span>{bas}</span> : null
                                }
                                <Link to="/basket"><BsCart3/></Link>
                            </div>
                            <div>
                                {
                                    wishData?.length ? <span>{wish}</span> : null
                                }
                                <Link to="/wish"><AiOutlineHeart/></Link>
                            </div>
                            <select id="cars" onChange={selectLange}>
                                <option value="" selected disabled hidden>{activeLang}</option>
                                {
                                    languages.map((item) => {
                                        return <option
                                            key={item.id}
                                            name={item.lang}
                                            value={item.lang}
                                            className={item.lang === activeLang ? 'language active' : 'language'}
                                        >

                                            {item.lang}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>


                </div>


                <div className={css.headerTwo}>
                    <Navbar expand="lg" variant="dark" expanded={closeNav}>
                        <Container fluid>
                            <Navbar.Brand><Link to={'/'}>
                                <img src={logoMain} alt="" width={'80'} height={'65'}/>
                            </Link></Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => {
                                setCloseNav(closeNav ? false : "closeNav")
                            }}/>
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav>
                                    <div className={css.main}>
                                        <div className={css.mainHome}>
                                            <div className={css.headOne}>
                                                <Link onClick={clickToUp}
                                                      className={`${pathname == "/" ? css.linkMian : null}`}
                                                      to="/">{t('home')}</Link>
                                                <Link onClick={clickToUp}
                                                      className={`${pathname == "/about" ? css.linkMian : null}`}
                                                      to="/about">{t('about')}</Link>
                                                <Link onClick={clickToUp}
                                                      className={`${pathname == "/product" || pathname == `/product/${id}` ? css.linkMian : null}`}
                                                      to="/product">{t('product')}</Link>
                                                <Link onClick={clickToUp}
                                                      className={`${pathname == "/delivary" ? css.linkMian : null}`}
                                                      to="/delivary">{t('delivary')}</Link>
                                                <Link onClick={clickToUp}
                                                      className={`${pathname == "/contact_us" ? css.linkMian : null}`}
                                                      to="/contact_us">{t('contacts')}</Link>
                                            </div>
                                            <div>
                                                {
                                                    profileType?.length ?
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                <img width="55px" height="50px" src={profile} alt=""/>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="/profile">
                                                                    <p>{t("Myprofile")}</p>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item href="/log_in"
                                                                               onClick={removeLocalStorage}>
                                                                    <p>{t("LogOut")}</p>
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        :
                                                        <button className={css.btn} onClick={() => setCloseNav(false)}>
                                                            <Link
                                                                to='/log_in'>{t("login")}</Link>
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
            </div>
            {/*////////////////////////////////*/}
            <div>
                {
                    pathname == '/' ? <Slider {...settings}>
                            {
                                bannerImage[0]?.map((item, index) => {
                                    return (
                                        <div className={css.zDIv} key={index}>
                                            <img src={item} alt=""/>
                                            <div className={css.homeOne}>
                                                {
                                                    homeBannerData?.map((item, index) => {
                                                        return (
                                                            <div className={css.homeTwo} key={index}>
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
                        </Slider> :
                        pathname == '/about' ? aboutBannerData?.map((item, index) => {
                            return (
                                <div className={css.zDIvAbout} key={index}>
                                    <img src={item.image} alt=""/>
                                    <div className={css.homeOne}>
                                        <div className={css.homeTwo}>
                                            <h1>{langValue == 'en' ? item.titleEn
                                                : langValue == 'ru' ? item.titleRu
                                                    : langValue == 'am' ? item.titleHy : null}</h1>
                                            <p>{langValue == 'en' ? item.subTitleEn
                                                : langValue == 'ru' ? item.subTitleRu
                                                    : langValue == 'am' ? item.subTititleHy : null}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : pathname == '/product' ? productBannerData?.map((item, index) => {
                            return (
                                <div className={css.zDIvProduct} key={index}>
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
                        }) : pathname == '/delivary' ? deleveryData?.map((item, index) => {
                            return (
                                <div className={css.zDIvProduct} key={index}>
                                    <img src={item.bannerImage} alt=""/>
                                    <div className={css.homeTextMain}>
                                        <div className={css.homeText}>
                                            <h1>{langValue == 'en' ? item.titleEn
                                                : langValue == 'ru' ? item.titleRu
                                                    : langValue == 'am' ? item.titleHy : null}</h1>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : pathname == '/contact_us' ? deleveryData?.map((item, index) => {
                            return (
                                <div className={css.zDIvProduct} key={index}>
                                    <img src={item.bannerImage} alt=""/>
                                    <div className={css.homeTextMain}>
                                        <div className={css.homeText}>
                                            <h1>{langValue == 'en' ? item.titleEn
                                                : langValue == 'ru' ? item.titleRu
                                                    : langValue == 'am' ? item.titleHy : null}</h1>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : pathname == '/profile' ? deleveryData?.map((item, index) => {
                                return (
                                    <div className={css.zDIvProduct} key={index}>
                                        <img src={item.bannerImage} alt=""/>
                                        <div className={css.homeTextMain}>
                                            <div className={css.homeText}>
                                                <h1>{langValue == 'en' ? item.titleEn
                                                    : langValue == 'ru' ? item.titleRu
                                                        : langValue == 'am' ? item.titleHy : null}</h1>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : pathname == '/wish' ? wishBannerData?.map((item, index) => {
                                return (
                                    <div className={css.zDIvProduct} key={index}>
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
                            }) : pathname == '/basket' ? basketMAinBannerData?.map((item, index) => {
                                return (
                                    <div className={css.zDIvProduct} key={index}>
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
                            }) : pathname == `/product/${id}` ? detailMainBannerData?.map((item, index) => {
                                return (
                                    <div className={css.zDIvProduct} key={index}>
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
            {/*////////////////////////////////*/}
        </div>
    );
};

export default Header;