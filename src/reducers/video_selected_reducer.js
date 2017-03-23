import Constants from '../constants/';

export default function(state = {}, action) {
  switch (action.type) {
    case Constants.SELECT_VIDEO:
      return {
        ...action.payload
      }
    default:
      return state;
  }
}