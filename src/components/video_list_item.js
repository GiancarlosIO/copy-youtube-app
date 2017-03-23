import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectVideo } from '../actions/videos_actions';

export class VideoListItem extends Component {

  handleClickVideoListItem = () => {
    const { dispatch, video } = this.props;
    dispatch(selectVideo(video));
  }

  render() {
    const { video } = this.props;
    const imageUrl = video.snippet.thumbnails.default.url;
    const title = video.snippet.title;
    return (
      <li className="list-group-item" onClick={this.handleClickVideoListItem}>
        <div className="video-list media">
          <div className="media-left">
            <img className="media-object" src={imageUrl} />
          </div>
          <div className="media-body">
            <div className="media-heading">
              {title}
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default connect()(VideoListItem);