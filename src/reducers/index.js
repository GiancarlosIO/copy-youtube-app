import { combineReducers } from 'redux';
import VideosReducer from './videos_reducer';
import VideoSelectedReducer from './video_selected_reducer';

const rootReducer = combineReducers({
  videos: VideosReducer,
  videoSelected: VideoSelectedReducer
})

export default rootReducer;