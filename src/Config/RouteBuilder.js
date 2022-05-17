import React, {memo, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import routesMain from '../Config/index';
import NotFound from "../Components/NotFound";
import LogIn from "../Components/LogIn";
import SignUp from "../Components/SignUp";
import ForgetPassword from "../Components/ForgetPassword";
import {useSelector} from "react-redux";
import Layout from "../Layout";
import Profile from "../Components/Profile";
import Loading from "../Components/Loading";
import Home from "../Components/Home";


const RouteBuilder = () => {

    const langValue = useSelector(state => state.productReducer.lang)
    const profileType = useSelector(state => state.productReducer.profileType)

    return (
        <div>
            <Suspense fallback={<Loading/>}>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        {
                            routesMain.map(({
                                                component: Component,
                                                path,
                                                children,
                                                exact
                                            }) => {
                                return (
                                    <Route key={path}
                                           exact={!!exact}
                                           path={`${path}`}
                                           element={<Component langValue={langValue}/>}
                                    />
                                )
                            })
                        }
                        <Route path="/*" element={<NotFound langValue={langValue}/>}/>
                        <Route path="/log_in" element={<LogIn langValue={langValue}/>}/>
                        {
                            profileType?.length ? <Route path="/" element={<Home/>}/> : <Route path="/sign_up" element={<SignUp/>}/>
                        }
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/forget_password" element={<ForgetPassword/>}/>
                    </Route>
                </Routes>
            </Suspense>
        </div>
    );
};

export default RouteBuilder;