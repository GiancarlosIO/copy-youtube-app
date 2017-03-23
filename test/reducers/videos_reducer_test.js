import { expect } from '../test_helper';
import Constants from '../../src/constants/';
import VideosReducer from '../../src/reducers/videos_reducer';

describe('Videos reducer', () => {
  it('handle action with unknow type', () => {
    expect(VideosReducer(undefined, {})).to.eql([]);
  });

  it('handle action of type SAVE_NEW_VIDEOS', () => {
    const action = {
      type: Constants.SAVE_NEW_VIDEOS,
      payload: [{id: 123}, {id: 1234}]
    };
    expect(VideosReducer([], action)).to.eql([{id: 123}, {id: 1234}]);
  });
});
