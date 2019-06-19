import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
const { shell } = require("electron");
import config from "../config";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      authing: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      let user = localStorage.getItem("loginInfo");
      if (user) {
        this.props.loginUser(JSON.parse(user));
        setTimeout(() => {
          this.setState({ authing: false });
        }, 2000);
      } else {
        this.setState({ authing: false });
      }
    }, 100);
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = () => {
    const { username, password } = this.state;
    this.props.loginUser({ username, password });
  };

  render() {
    return (
      <div
        style={{ height: "100%" }}
        className="d-flex align-items-center border-top border-top-2 border-primary pt-6"
      >
        <div class="container">
          <div class="row  justify-content-center">
            {this.state.authing ? (
              <div class="spinner-border text-primary mt-8" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <div class="col-4">
                <h1 class="display-4 text-center mt-6 mb-3">Log in</h1>

                <p class="text-muted text-center mb-5">
                  Get access to Soundbolt.
                </p>

                <div class="form-group">
                  <label>Username</label>

                  <input
                    name="username"
                    onChange={this.onChange}
                    type="text"
                    class="form-control"
                    placeholder="Enter your username"
                  />
                </div>

                <div class="form-group">
                  <div class="row">
                    <div class="col">
                      <label>Password</label>
                    </div>
                    <div class="col-auto">
                      <a
                        class="form-text small text-primary"
                        onClick={e => shell.openExternal(`${config.url}/reset`)}
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <div class="input-group input-group-merge">
                    <input
                      type="password"
                      name="password"
                      onChange={this.onChange}
                      class="form-control form-control-appended"
                      placeholder="Enter your password"
                    />

                    <div class="input-group-append">
                      <span class="input-group-text">
                        <i class="fe fe-eye" />
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => this.onSubmit()}
                  class="btn btn-lg btn-block btn-primary mb-3"
                >
                  Log In
                </button>

                <div class="text-center">
                  <small class="text-muted text-center">
                    Don't have an account yet?{" "}
                    <a
                      class="form-text small text-primary"
                      onClick={e =>
                        shell.openExternal(`${config.url}/register`)
                      }
                    >
                      Sign up
                    </a>
                  </small>
                </div>
                {this.props.auth.msg ? (
                  <div class="alert alert-danger mt-2" role="alert">
                    {this.props.auth.msg}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: e => dispatch(loginUser(e))
});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
