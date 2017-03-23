import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from '../test_helper';
import Constants from '../../src/constants';
import { saveNewVideos, searchVideos, selectVideo } from '../../src/actions/videos_actions';
import YoutubeAPI from '../../src/api/youtube_api';

const middlewares = [thunk.withExtraArgument(YoutubeAPI)];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  describe('selectVideo', () => {
    let expectedAction, video;
    beforeEach(() => {
      video = { id: 123 };
      expectedAction = {
        type: Constants.SELECT_VIDEO,
        payload: video
      };
    });
    it('should create a action of type SELECT_VIDEO', () => {
      expect(selectVideo(video)).to.eql(expectedAction);
    });
  });

  describe('saveNewVideos', () => {
    let expectedAction, videos;
    beforeEach(() => {
      videos = [{id: 1}, {id: 2}];
      expectedAction = {
        type: Constants.SAVE_NEW_VIDEOS,
        payload: videos
      };
    });
    it('should create a action of type SAVE_NEW_VIDEOS', () => {
      expect(saveNewVideos(videos)).to.eql(expectedAction);
    });
  });

  describe('asyn actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    describe('searchVideos', () => {
      it('create a SAVE_NEW_VIDEO when search videos has been done', () => {
        nock('https://www.googleapis.com/youtube/v3')
          .get('/search?part=snippet&key=AIzaSyA_GqEUG4i2XDK_jLGwA5AHaP-7gGdOpN4&q=cards&type=video')
          .reply(200, {items: [ {id: 1}, {id: 2} ]});
        const expectedActions = [
          { type: Constants.SAVE_NEW_VIDEOS, payload: [{id:1}, {id: 2}] },
          { type: Constants.SELECT_VIDEO, payload: {id: 1} }
        ]
        const store = mockStore({ videos: [], videoSelected: {} });
        return store.dispatch(searchVideos('cards'))
          .then(() => {
            expect(store.getActions()).to.eql(expectedActions);
          });
      });
    })
  });
});