import React, { Component } from "react";
import { connect } from "react-redux";
import commaNumber from "comma-number";
import { history } from "../store/index";
import { createTask } from "../actions/taskActions";

export class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plays: 0,
      speed: "Normal",
      proxies: "Soundbolt Proxies",
      currentPlays: 0
    };
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  render() {
    return (
      <div className="main-content pt-4">
        <div className="container-fluid">
          <div className="header mt-md-2">
            <h1 className="header-title">Create Task</h1>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-auto">
                  <a class="avatar avatar-xl">
                    <img
                      src={
                        this.props.search.selected.artwork_url
                          ? this.props.search.selected.artwork_url
                          : "https://www.essaybiz.com//assets/images/default-user.png"
                      }
                      alt="..."
                      class="avatar-img rounded"
                    />
                  </a>
                </div>
                <div class="col ml-n2">
                  <h4 class="card-title mb-1">
                    {this.props.search.selected.title}
                  </h4>

                  <p class="card-text small text-muted mb-1">
                    {this.props.search.selected.user.username}
                  </p>

                  <p class="card-text small mt-3">
                    <span class="fe fe-play" style={{ color: "#335eea" }} />{" "}
                    {commaNumber(this.props.search.selected.playback_count)}{" "}
                    <span class="fe fe-heart ml-2" style={{ color: "red" }} />{" "}
                    {commaNumber(this.props.search.selected.likes_count)}{" "}
                    <span
                      class="fe fe-repeat ml-2"
                      style={{ color: "orange" }}
                    />{" "}
                    {commaNumber(this.props.search.selected.reposts_count)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div class="form-group">
                    <label for="formGroupExampleInput">Plays</label>
                    <input
                      style={{ width: "60%" }}
                      onChange={this.onChange}
                      name="plays"
                      type="number"
                      min="0"
                      defaultValue="0"
                      class="form-control"
                      id="formGroupExampleInput"
                      placeholder="Enter number of plays to add..."
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div class="form-group">
                    <label for="formGroupExampleInput">Speed</label>
                    <select
                      onChange={this.onChange}
                      name="speed"
                      style={{ width: "60%" }}
                      class="form-control"
                    >
                      <option>Super Slow</option>
                      <option>Slow</option>
                      <option selected="selected">Normal</option>
                      <option>Fast</option>
                      <option>Really Fast</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div class="form-group">
                    <label for="formGroupExampleInput">Proxies</label>
                    <select
                      onChange={this.onChange}
                      name="proxies"
                      style={{ width: "60%" }}
                      class="form-control"
                    >
                      <option selected="selected">Soundbolt Proxies</option>
                      <option>My Proxies</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div class="form-group">
                    <button
                      onClick={() => history.push("/search")}
                      className="btn btn-outline-danger float-right"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() =>
                        this.props.createTask({
                          track: this.props.search.selected,
                          state: this.state
                        })
                      }
                      className="btn btn-outline-success mr-2 float-right"
                    >
                      Create Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search
});

const mapDispatchToProps = dispatch => ({
  createTask: e => dispatch(createTask(e))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
