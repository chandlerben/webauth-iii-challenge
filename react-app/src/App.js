import React from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import "./App.css";

import SignIn from "./auth/Login";
import Users from "./users/Users";
import SignUp from "./auth/SignUp";

function App(props) {
  function logout() {
    localStorage.removeItem("jwt");
    props.history.push("/signin");
  }
  return (
    <>
      <header>
        <NavLink to="/signin">Sign-In</NavLink>
        &nbsp;||&nbsp;
        <NavLink to="/users">Users</NavLink>
        &nbsp;||&nbsp;
        <NavLink to="/signup">Sign-Up</NavLink>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </header>
      <main>
        <Route path="/signup" component={SignUp} />

        <Route path="/signin" component={SignIn} />
        <Route path="/users" component={Users} />
      </main>
    </>
  );
}

export default withRouter(App);
