import Constants from '../constants/';

export default function(state = [], action) {
  switch (action.type) {
    case Constants.SAVE_NEW_VIDEOS:
      return [
        ...action.payload
      ]
    default:
      return state;
  }
}