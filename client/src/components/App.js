import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header/";
import Signin from "./Signin";
import Products from "./Products";
import Footer from "./Footer";
import Form from "./Form";
import GlobalStyles from "../GlobalStyles";
import ProductGrid from "./ProductGrid";
import ProductPage from "./ProductPage";
import HomePage from "./HomePage";

function App() {
  // const [companies, setCompanies] = useState(null);
  // //determine where the fetch will go
  // useEffect(() => {
  //   fetch("/companies")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setCompanies(data.data);
  //     });
  // }, []);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/item/:id">
            <ProductPage />
          </Route>
          <Route exact path="/signin">
            <Signin />
          </Route>
          <Route exact path="/form">
            <Form />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
