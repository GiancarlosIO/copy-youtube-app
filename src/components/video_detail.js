import React, { Component } from 'react';
import { connect } from 'react-redux';

export class VideoDetail extends Component {
  render() {
    const { videoSelected } = this.props;
    if (!videoSelected.id) {
      return <div>Loading</div>
    }
    const videoId = videoSelected.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;

    return (
      <div className="video-detail col-md-8">
        <div className="embed-responsive embed-responsive-16by9">
          <iframe className="embed-responsive-item" src={url} ></iframe>
        </div>
        <div className="details">
          <div>{videoSelected.snippet.title}</div>
          <div>{videoSelected.snippet.description}</div>
        </div>
      </div>
    )
  }
};

export default connect(
  ({ videoSelected }) => ({ videoSelected })
)(VideoDetail);