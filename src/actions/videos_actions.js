import Constants from '../constants/';

export const saveNewVideos = (videos) => ({ type: Constants.SAVE_NEW_VIDEOS, payload: videos });
export const selectVideo = (video) => ({ type: Constants.SELECT_VIDEO, payload: video });
export const errorToSearchVideos = (error) => ({ type: 'ERROR', payload: error });

// Async actions
export const searchVideos = (term = 'cars') => {
  return (dispatch, getState, YoutubeAPI) => {
    return YoutubeAPI.searchVideos(term).then(
      (videos) => {
        dispatch(saveNewVideos(videos));
        dispatch(selectVideo(videos[0]));
      }
    ).catch( error => console.log('error to action search videos', error));
  }
}