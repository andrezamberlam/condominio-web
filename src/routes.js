import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import SingUp from "./pages/SingUp";
import SingIn from "./pages/SingIn";
import Condominio from './pages/Condominio';
import Pessoa from './pages/Pessoa';
// import GlobalStyle from 'styled-components';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SingIn} />
      <Route path="/singup" component={SingUp} />
      <PrivateRoute path="/app" component={Condominio} />
      <PrivateRoute path="/pessoa" component={Pessoa} />      
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;