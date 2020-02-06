import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from './auth';


import Project from './components/Project';
import Login from './components/Login';
import Register from './components/Register';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route { ...rest } render={ props => (
        isAuthenticated() ? 
        ( <Component { ...rest } /> ) :
        ( <Redirect to={{ pathname: '/', state: { from: props.location } }} /> )
    ) } />
);

const Routes = () =>(
    <BrowserRouter>
        <Switch>
            <PrivateRoute path="/project" component={ Project } />
            <Route exact path="/" component={ Login } /> 
            <Route path="/register" component={ Register } /> 
        </Switch>
    </BrowserRouter>
);

export default Routes;