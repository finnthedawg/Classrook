import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import ErrorPage from './components/404';
import './App.css'
import Login from './components/Login';
import Content from './components/Content'
import Majors from './components/Majors'
import Reviews from './components/Reviews'
import User from './components/User'

const Refresh = ({ path = '/' }) => (
    <Route
        path={path}
        component={({ history, location, match }) => {
            history.replace({
                ...location,
                pathname: location.pathname.substring(match.path.length)
            });
            return null;
        }}
    />
);

export const isAuthenticated = () => {
    if (sessionStorage.getItem("user") === null)
        return false;
    else return true;
}

export const AuthenticatedRoute = ({
    component: Component,
    exact,
    path,
}) => (
        <Route
            exact={exact}
            path={path}
            render={props =>
                isAuthenticated() ? (
                    <div>
                        <Header />
                        <Component {...props} />
                    </div>
                ) :
                    <Login />
            }
        />
    )

    

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <AuthenticatedRoute exact path="/" component={Login} />
                        <AuthenticatedRoute exact path="/content" component={Content} />
                        <AuthenticatedRoute exact path="/majors" component={Majors} />
                        <AuthenticatedRoute exact path="/reviews" component={Reviews} />
                        <AuthenticatedRoute exact path="/user" component={User} />
                        <Refresh path="/refresh" />
                        <AuthenticatedRoute component={ErrorPage} />
                        {/* <Refresh /> */}
                    </Switch>
                </Router>
            </div>
        );
    }
}
export default App;
