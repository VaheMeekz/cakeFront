import React, {useEffect, useState} from 'react';
import css from './product.module.css';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import ProductFilter from "./ProductFilter";
import {useDispatch, useSelector} from "react-redux";
import {productReducer} from "../../Store/reducers/productReducer";
import {productFooter, productGet} from "../../Store/actions/productActions";
import ProductItem from "./ProductItem";
import productImg from '../../Images/productBg.png';
import {makeArray} from "../../keys";
import {MdOutlineKeyboardArrowRight} from 'react-icons/md';
import {MdOutlineKeyboardArrowLeft} from 'react-icons/md';

const Product = ({langValue}) => {

    const productItem = useSelector(state => state.productReducer.product);
    const product_get = useSelector(state => state.productReducer.product_footer_get);
    const count = useSelector(state => state.productReducer.count);

    const limit = 6;

    const productImage = product_get?.map(i => i.image)

    const [page, setPage] = useState(0);
    const [pages, setPages] = useState([]);
    const [categoryId, setCategoryId] = useState([]);
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
    const [validated, setValidated] = useState(false);
    const [search, setSearch] = useState('')
    const [lang, setLang] = useState('en')

    useEffect(() => {
        if (count) {
            setPages(makeArray(Math.ceil(count / limit)));
        }
    }, [count, limit]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productGet(categoryId, minValue, maxValue, page, limit, search, lang))
    }, [page])

    useEffect(() => {
        dispatch(productFooter())
    }, [])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    console.log(productItem?.length,'++++++++++++++')


    return (
        <div>
            <div style={{
                width: "90%",
                margin: "0 auto"
            }}>
                <Container fluid>
                    <Row>
                        <Col lg={3} md={4} xs={12} className="mt-5 mb-5">
                            <ProductFilter langValue={langValue} lang={lang} setLang={setLang} search={search} setSearch={setSearch}
                                           maxValue={maxValue} minValue={minValue}
                                           categoryId={categoryId}
                                           setCategoryId={setCategoryId}
                                           setMinValue={setMinValue} setMaxValue={setMaxValue}/>
                        </Col>
                        <Col lg={8} md={8} xs={12} className="mt-5 mb-5">
                            <div className={css.itemMain}>
                                {
                                    productItem?.map((item, productItem) => {
                                        return (
                                            <ProductItem item={item} langValue={langValue}/>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                {
                                    productItem?.length < 7 ? null : <div className="pagBox">
                                    <div>
                                {pages.length - 1 == page ? (
                                    // <ArrowBackIcon
                                    //     onClick={() => {
                                    //         setPage(page - 1);
                                    //     }}
                                    // />
                                    <button onClick={() => {
                                    setPage(page - 1);
                                }} type="reset" className='btnArrow'><MdOutlineKeyboardArrowLeft/></button>
                                    ) : null}
                                    </div>
                                {pages.length > 1 &&
                                    pages.map((s) => {
                                    return (
                                    <div
                                    className={page === s ? "ActivePagItem" : "pagItem"}
                                    key={s}
                                    onClick={() => {
                                    setPage(s);
                                }}
                                    >
                                {s + 1}
                                    </div>
                                    );
                                })}
                                    <div>
                                {pages.length - 1 == page ? null : (
                                    <button onClick={() => {
                                    setPage(page + 1);
                                }} type="reset" className='btnArrow'><MdOutlineKeyboardArrowRight/></button>
                                    )}
                                    </div>
                                    </div>
                                }

                            </div>
                        </Col>
                    </Row>
                </Container>

            </div>
            <div style={{
                backgroundImage: `url(${productImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: 'center',
                height: "650px",
                margin: "3rem 0"
            }}>
                {
                    product_get?.map((item) => {
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
                                        <Button type="submit">Subscribe</Button>
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

export default Product;