import React, {useEffect} from 'react';
import css from './dekivary.module.css';
import {Col, Container, Row} from "react-bootstrap";
import deleveryBg from '../../Images/deleveryBg.png';
import {useDispatch, useSelector} from "react-redux";
import {deleveryDataGet, deleveryFooter, deleveryGet, deleveryGetValue} from "../../Store/actions/productActions";

const Delivary = ({langValue}) => {

    const deleveryData = useSelector(state => state.productReducer.delevery);
    const deleveryValueData = useSelector(state => state.productReducer.deleveryValue);
    const deleveryFooterGet = useSelector(state => state.productReducer.delevery_footer_get);
    const deleveryDataGetMain = useSelector(state => state.productReducer.deleveryDataGet);

    // const delevery = deleveryFooter?.map(i => i.bannerImage)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(deleveryGet());
        dispatch(deleveryGetValue());
        dispatch(deleveryFooter());
        dispatch((deleveryDataGet()))
    }, []);

    return (
        <div>

            <Container>
                <Row className='m-5'>

                    {
                        deleveryDataGetMain?.map((item) => {
                            return (
                                <Col lg={12} md={12} xs={12} className='pt-3'>
                                    <div className={css.deleveryDiv}>
                                        <h2>{langValue == "en" ? item.subjectEn : langValue == "ru" ? item.subjectRu
                                            : langValue == "am" ? item.subjectHy : null}</h2>
                                        <p>{langValue == "en" ? item.answerEn : langValue == "ru" ? item.answerRu
                                            : langValue == "am" ? item.answerHy : null}</p>
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row className="justify-content-md-center">
                    <Col lg={12} xs={12} md={12}>
                        <div style={{
                            overflowX: 'auto'
                        }}>
                            <table className={css.table}>
                                <thead>
                                </thead>
                                <tbody>
                                    {
                                        deleveryValueData?.map((item) => {
                                            return (
                                                <tr>
                                                    <td className={css.tdR}>{item.loacation}</td>
                                                    <td className={css.tdL}>{item.price}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </Container>

            <div style={{
                backgroundImage: `url(${deleveryBg})`,
                backgroundSize: "cover",
                height: "650px",
                backgroundRepeat: "no-repeat",
                marginTop: "5rem",
                marginBottom: "5rem"
            }}>

                <div className={css.bgDiv}>
                    <h2>Company name</h2>
                    <p>Good reputation, unique taste, high quality, compliance with food safety standards, constant
                        monitoring of storage time and reasonable prices</p>
                </div>

            </div>

            <div className={css.pink}>
                <Container>
                    <Row>
                        <Col lg={5} md={6} xs={12}>
                            <div className={css.bhText}>
                                <p>Lorem ipsum dolor sit amet, consectetur </p>
                            </div>
                        </Col>
                        <Col lg={7} md={6} xs={12}>
                            <div className={css.bhInput}>
                                <div>
                                    <input type="text"/>
                                </div>
                                <div className={css.bhBtn}>
                                    <button>Subscribe</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
    );
};

export default Delivary;