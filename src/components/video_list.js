import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { searchVideos } from '../actions/videos_actions';
import VideoListItem from './video_list_item';

export class VideoList extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(searchVideos('cars'));
  }

  render() {
    const { videos } = this.props;
    const videosItems = videos.map((video) => {
      return (
        <VideoListItem
          key={video.etag}
          video={video} />
      );
    });
    return (
      <ul className="col-md-4 list-group">
        {videosItems}
      </ul>
    );
  }
}

export default connect(
  ({ videos }) => ({ videos })
)(VideoList);