import React, { Component } from "react";
import { searchSongs, selectSong } from "../actions/searchActions";
import { connect } from "react-redux";
import { DebounceInput } from "react-debounce-input";
import commaNumber from "comma-number";

export class Search extends Component {
  makeSearchList() {
    let list = [];
    let items = this.props.search.results;
    for (let i = 0; i < items.length; i++) {
      list.push(
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
                    items[i].artwork_url
                      ? items[i].artwork_url
                      : "https://www.essaybiz.com//assets/images/default-user.png"
                  }
                  alt="..."
                  class="avatar-img rounded"
                />
              </a>
            </div>
            <div class="col ml-n2">
              <h4 class="card-title mb-1">{items[i].title}</h4>

              <p class="card-text small text-muted mb-1">
                {items[i].user.username}
              </p>

              <p class="card-text small mt-3">
                <span class="fe fe-play" style={{ color: "#335eea" }} />{" "}
                {commaNumber(items[i].playback_count)}{" "}
                <span class="fe fe-heart ml-2" style={{ color: "red" }} />{" "}
                {commaNumber(items[i].likes_count)}{" "}
                <span class="fe fe-repeat ml-2" style={{ color: "orange" }} />{" "}
                {commaNumber(items[i].reposts_count)}
              </p>
            </div>
          </div>
        </li>
      );
    }
    return list;
  }

  render() {
    return (
      <div className="main-content">
        <div className="navbar navbar-light mb-2">
          <div className="nav-item w-50 p-2">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span
                  class="input-group-text form-control-rounded"
                  id="basic-addon1"
                >
                  <span class="fe fe-search" />
                </span>
              </div>
              <DebounceInput
                minLength={2}
                debounceTimeout={300}
                onChange={e => this.props.searchSongs(e.target.value)}
                type="text"
                class="form-control form-control-rounded"
                placeholder="Search Tracks or Paste URL..."
              />
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="card mt-4">
            {this.props.search.results != null ? (
              <ul class="list-group list-group-lg">{this.makeSearchList()}</ul>
            ) : null}
          </div>
          <div class="text-center">
            <img
              src={require("../assets/img/illustrations/lost.svg")}
              alt="..."
              class="img mt-5 mb-5"
              width="400"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  searchSongs: e => dispatch(searchSongs(e)),
  selectSong: e => dispatch(selectSong(e))
});

const mapStateToProps = state => ({
  search: state.search
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
