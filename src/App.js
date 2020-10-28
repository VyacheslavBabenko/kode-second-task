import LoginPage from "./pages/LoginPage/LoginPage.js";
import OTPPage from "./pages/OTPPage/OTPPage.js";
import MainPage from "./pages/MainPage/MainPage.js";
import CardInfo from "./pages/CardInfo/CardInfo";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    // <LoginPage></LoginPage>
    <Router>
      <Switch>
        <Route path="/otp">
          <OTPPage></OTPPage>
        </Route>
        <Route path="/main">
          <MainPage></MainPage>
        </Route>
        <Route path="/card">
          <CardInfo></CardInfo>
        </Route>
        <Route path="/">
          <LoginPage></LoginPage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
