import { expect } from '../test_helper';
import Constants from '../../src/constants/';
import VideoSelectedReducer from '../../src/reducers/video_selected_reducer';

describe('VideoSelected Reducer', () => {
  it('handle the action with action type unknow', () => {
    expect(VideoSelectedReducer(undefined, {})).to.eql({});
  });

  it('handle action of type SELECT_VIDEO', () => {
    const action = {
      type: Constants.SELECT_VIDEO,
      payload: { id: 123 }
    };
    expect(VideoSelectedReducer({}, action)).to.eql({id: 123});
  })
});