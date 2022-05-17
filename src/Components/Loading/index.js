import React from 'react';
import css from './loading.module.css';
import Header from "../../Container/Header";
import Footer from "../../Container/Footer";
import {Spinner} from "react-bootstrap";

const Loading = () => {
    return (
        <div>
            <Header/>

            <div className={css.main}>
                <Spinner animation="border" variant="danger" />
            </div>

            <Footer/>
        </div>
    );
};

export default Loading;