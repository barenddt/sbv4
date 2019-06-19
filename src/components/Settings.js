import React, { Component } from "react";
import { connect } from "react-redux";

export class Settings extends Component {
  render() {
    return (
      <div className="main-content pt-4">
        <div className="container-fluid">
          <div className="header mt-md-2">
            <h1 className="header-title">Settings</h1>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="header mt-md-2">
                <h2 className="header-title">Defaults</h2>
              </div>
              <div className="row">
                <div className="col-6">
                  <div class="form-group">
                    <label for="formGroupExampleInput">Proxies</label>
                    <select style={{ width: "60%" }} class="form-control">
                      <option selected="selected">Soundbolt Proxies</option>
                      <option>My Proxies</option>
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div class="form-group">
                    <label for="formGroupExampleInput">Thread Sleep</label>
                    <input
                      style={{ width: "60%" }}
                      type="number"
                      min="1"
                      defaultValue="15"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="header mt-md-2">
                <h2 className="header-title">Proxies</h2>
              </div>
              <div className="row">
                <div className="col-6">
                  Soundbolt Proxies:{" "}
                  {this.props.startup.proxies
                    ? this.props.startup.proxies.length
                    : "Could not load proxies"}
                </div>
                <div className="col-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  startup: state.startup
});

export default connect(mapStateToProps)(Settings);
