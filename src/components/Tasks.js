import React, { Component } from "react";
import { connect } from "react-redux";
import commaNumber from "comma-number";

export class Tasks extends Component {
  renderTasks() {
    let tasks = [];
    let items = this.props.task.tasks;

    for (let i = 0; i < items.length; i++) {
      tasks.push(
        <li
          onClick={() => this.props.selectSong(items[i])}
          class="list-group-item"
          style={{ cursor: "pointer" }}
        >
          <div className="row">
            <div className="col-auto">
              <a class="avatar avatar-xl">
                <img
                  src={
                    items[i].track.artwork_url
                      ? items[i].track.artwork_url
                      : "https://www.essaybiz.com//assets/images/default-user.png"
                  }
                  alt="..."
                  class="avatar-img rounded"
                />
              </a>
            </div>
            <div class="col ml-n2">
              <h4 class="card-title mb-1">{items[i].track.title}</h4>

              <p class="card-text small text-muted mb-1">
                {items[i].track.user.username}
              </p>

              <p class="card-text small mt-3">
                <span class="fe fe-play mr-2" style={{ color: "#335eea" }} />
                {items[i].state.currentPlays}/{items[i].state.plays}
                <span
                  class="fe fe-zap mr-2 ml-3"
                  style={{ color: "#335eea" }}
                />
                {items[i].state.speed}
                <span
                  class="fe fe-cloud-lightning mr-2 ml-3"
                  style={{ color: "#335eea" }}
                />
                {items[i].state.proxies}
              </p>
            </div>
          </div>
        </li>
      );
    }

    return tasks;
  }

  render() {
    return (
      <div className="main-content pt-4">
        <div className="container-fluid">
          <div className="header mt-md-2">
            <h1 className="header-title">Tasks</h1>
          </div>
          <div className="card mt-4">
            {this.props.task.tasks.length > 0 ? (
              <ul class="list-group list-group-lg">{this.renderTasks()}</ul>
            ) : null}
          </div>
        </div>
        <div class="text-center">
          <img
            src="https://i.postimg.cc/3JCDxc1r/output-onlinepngtools.png"
            alt="..."
            class="img mt-5 mb-5"
            width="400"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  task: state.task
});

export default connect(mapStateToProps)(Tasks);
