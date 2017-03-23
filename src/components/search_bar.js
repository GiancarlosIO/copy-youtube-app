import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { searchVideos } from '../actions/videos_actions';

export class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  searchVideo = (term) => {
    const { dispatch } = this.props;
    dispatch(searchVideos(term));
  }

  render() {
    const debounceSearchVideo = _.debounce(this.searchVideo, 400);
    return (
      <div className="search-bar">
        <input onChange={ (e) => { debounceSearchVideo(e.target.value) } } />
      </div>
    )
  }
}

export default connect()(SearchBar);