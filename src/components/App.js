import React, { Component } from "react";
import SideMenu from "./SideMenu";
import { Route, Switch, Redirect } from "react-router-dom"; // react-router v4/v5
import "../assets/css/main.css";
import "../assets/css/theme.min.css";
import "../assets/fonts/feather/feather.min.css";
import Search from "./Search";
import Tasks from "./Tasks";
import Create from "./Create";
import Settings from "./Settings";
import Login from "./Login";
import { history } from "../store";
import { ConnectedRouter, push, withRouter } from "connected-react-router";
import { connect } from "react-redux";
import { grabProxies } from "../actions/startupActions";
import { updateUser } from "../actions/authActions";

class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.grabProxies();
    }, 1000);

    setInterval(() => {
      if (this.props.auth.authenticated) {
        this.props.updateUser();
      }
    }, 30000);
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <SideMenu />
        <Switch>
          <Route path="/tasks" component={Tasks} />
          <Route path="/create" component={Create} />
          <Route path="/settings" component={Settings} />
          <Route path="/search" component={Search} />
          <Route path="/" component={Login} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  grabProxies: () => dispatch(grabProxies()),
  updateUser: () => dispatch(updateUser())
});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
