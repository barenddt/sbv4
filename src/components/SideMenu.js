import React, { Component } from "react";
import { changeMenu } from "../actions/menuActions";
import { logoutUser } from "../actions/authActions";
import { connect } from "react-redux";
const { shell } = require("electron");
import commaNumber from "comma-number";
import { history } from "../store/index";
import config from "../config";

export class SideMenu extends Component {
  constructor(props) {
    super(props);
  }

  _makeMenu() {
    let menu = [];
    let items = this.props.menu.items;

    for (let i = 0; i < items.length; i++) {
      let style =
        items[i].name == this.props.menu.activeTab
          ? "nav-item active"
          : "nav-item";
      menu.push(
        <li className={style}>
          <a
            onClick={() => {
              this.props.changeMenu(items[i].name);
            }}
            className="nav-link"
          >
            <span class={items[i].icon} />
            {items[i].name}
          </a>
        </li>
      );
    }

    return menu;
  }

  render() {
    if (this.props.menu.activeTab == "Login") {
      return null;
    } else {
      return (
        <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light">
          <div className="container-fluid">
            <div className="navbar-brand">
              <img
                width={140}
                src="https://i.postimg.cc/L66nmpMs/logo.png"
                className="navbar-brand-img"
              />
            </div>
            <hr class="navbar-divider my-3" />
            <ul className="navbar-nav">{this._makeMenu()}</ul>
            <div className="mt-auto" />
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <span class="fe fe-user" />{" "}
                  {this.props.auth.authenticated
                    ? this.props.auth.user.username
                    : null}
                </div>
                <span class="fe fe-play-circle" />{" "}
                {this.props.auth.authenticated
                  ? commaNumber(this.props.auth.user.credits)
                  : null}
                <button
                  onClick={e => shell.openExternal(`${config.url}/dashboard`)}
                  className="btn btn-sm btn-outline-primary mt-3"
                >
                  Buy Credits
                </button>
              </div>
            </div>
            <hr />
            <ul className="navbar-nav">
              <li className="nav-item">
                <p className="nav-link text-muted">v0.1.2</p>
              </li>
              <li className="nav-item">
                <a onClick={() => this.props.logoutUser()} className="nav-link">
                  <i class="fe fe-log-out" />
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
  }
}

const mapStateToProps = state => ({
  menu: state.menu,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  changeMenu: e => dispatch(changeMenu(e)),
  logoutUser: e => dispatch(logoutUser(e))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
