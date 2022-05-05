import React, {useEffect} from "react";
import Layout from "./Layout";
import {Route, Routes} from "react-router-dom";
import Comps from "./Config/comps";
import Home from "./Components/Home";
import AboutUs from "./Components/AboutUs";
import Product from "./Components/Product";
import ProductDetail from "./Components/ProductDetail";
import Basket from "./Components/Basket";
import WishList from "./Components/WishList";
import Delivary from "./Components/Delivary";
import ContactUs from "./Components/ContactUs";
import Cart from "./Components/Cart";
import "slick-carousel/slick/slick.css";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Terms from "./Components/Terms";
import {useDispatch, useSelector} from "react-redux";
import {langGet} from "./Store/actions/productActions";
import ForgetPassword from "./Components/ForgetPassword";


function App() {

    const langValue = useSelector(state => state.productReducer.lang)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(langGet('en'))
    },[])

  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs langValue={langValue}/>} />
              <Route path="/product" element={<Product langValue={langValue}/>} />
              <Route path="/product/:id" element={<ProductDetail langValue={langValue}/>} />
              <Route path="/basket" element={<Basket langValue={langValue}/>} />
              <Route path="/wish" element={<WishList />} />
              <Route path="/delivary" element={<Delivary langValue={langValue}/>} />
              <Route path="/contact_us" element={<ContactUs />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/terms" element={<Terms langValue={langValue}/>} />
          </Route>
          <Route path="/log_in" element={<LogIn langValue={langValue}/>} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/forget_password" element={<ForgetPassword />} />
      </Routes>
  );
}

export default App;
