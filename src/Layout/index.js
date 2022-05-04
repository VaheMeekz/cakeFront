import React from 'react';
import Header from "../Container/Header";
import Comps from "../Config/comps";
import Footer from "../Container/Footer";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Header/>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;