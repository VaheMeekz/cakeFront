import React from "react";
import {Routes, Route,} from "react-router-dom";
import {privatePAge} from "./routes.index";

const Comps = () => {
    return (
            <Routes>
                {privatePAge.map(({path, Component}) => {
                    return <Route key={path} path={path} Component={Component} />;
                })}
            </Routes>
    );
};

export default Comps;