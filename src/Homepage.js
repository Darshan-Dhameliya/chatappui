import React from "react";
import LoginPage from "./LoginPage";
import ChatPage from "./ChatPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/chatpage">
            <ChatPage />
          </Route>
          <Route path="/Loginpage">
            <LoginPage />
          </Route>
          <Redirect to="/Loginpage" />
        </Switch>
      </Router>
    </>
  );
};

export default Homepage;
