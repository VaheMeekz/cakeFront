import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Container, Form, Row, Tabs, Tab} from "react-bootstrap";
import ProductDetailImages from "./ProductDetailImages";
import ProductDelevriData from "./ProductDelevriData";
import {detailFooter, productDetailGetId, productGet} from "../../Store/actions/productActions";
import css from "../Product/product.module.css";
import {useTranslation} from "react-i18next";


const ProductDetail = ({langValue}) => {

    let {id} = useParams();

    const {t} = useTranslation();

    const productDataDetail = useSelector(state => state.productReducer.productDetailGetId);
    const productDataDetailFooter = useSelector(state => state.productReducer.detailFooter);

    const productDataDetailFooterImage = productDataDetailFooter?.map(i => i.image)

    const add = productDataDetail?.map(i => i.adition_info_en.split(','))
    const addPrice = productDataDetail?.map(i => i.addition_info_value.split(','))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productGet())
        dispatch(productDetailGetId(id))
        dispatch(detailFooter())
    }, [])

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <div>

            <Container>
                <Row>
                    <Col lg={5} md={6} xs={12}>
                        {productDataDetail?.map((item) => {
                            return (
                                <ProductDetailImages item={item}/>
                            )
                        })
                        }
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        {
                            productDataDetail?.map((item) => {
                                return (
                                    <ProductDelevriData item={item} langValue={langValue}/>
                                )
                            })
                        }
                    </Col>
                    <Col lg={10} md={12} xs={12} className='mt-5'>
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="home" title="Description">
                                {
                                    productDataDetail?.map((item) => {
                                        return (
                                            <p className={css.descText}>{
                                                langValue == "en" ? item.long_description_en
                                                : langValue == "ru" ? item.long_description_ey
                                                : langValue == "am" ? item.long_description_hy : null}
                                            </p>
                                        )
                                    })
                                }
                            </Tab>
                            <Tab eventKey="profile" title="Additional Information">
                                <table className={css.tableDetail}>
                                    {
                                        add[0]?.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                    <td>{addPrice[0][index]}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>

            <div style={{
                backgroundImage: `url(${productDataDetailFooterImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: 'center',
                height: "650px",
                margin: "3rem 0"
            }}>
                {
                    productDataDetailFooter?.map((item) => {
                        return (
                            <div className={css.productText}>
                                <h1>{langValue == "en" ? item.titleEn
                                    : langValue == "ru" ? item.titleRu
                                        : langValue == "am" ? item.titleHy : null}</h1>
                                <p>{langValue == "en" ? item.subTitleEn
                                    : langValue == "ru" ? item.subTitleRu
                                        : langValue == "am" ? item.subTitleHy : null}</p>
                            </div>
                        )
                    })
                }
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
                            <Form validated={validated} onSubmit={handleSubmit}>
                                <div className={css.bhInput}>
                                    <div className={css.inp}>
                                        <Form.Group as={Col} controlId="validationCustom01">
                                            <Form.Control className='p-3' required type="email" placeholder="Email"
                                                          name="name"/>
                                        </Form.Group>
                                    </div>
                                    <div className={css.bhBtn}>
                                        <Button type="submit">{t("Subscribe")}</Button>
                                    </div>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
    );
};

export default ProductDetail;