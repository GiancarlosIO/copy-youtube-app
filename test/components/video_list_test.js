import React from 'react';
import { renderComponent, expect } from '../test_helper';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import YoutubeAPI from '../../src/api/youtube_api';
import VideoListConnected, { VideoList } from '../../src/components/video_list';
import videoListItemConnected, { VideoListItem } from '../../src/components/video_list_item';
import {searchVideos} from '../../src/actions/videos_actions';

const middlewares = [thunk.withExtraArgument(YoutubeAPI)];
const mockStore = configureMockStore(middlewares);

function setup() {
  const props = {
    videos: [{etag: 1}, {etag: 2}],
    videoSelected: {etag:1}
  };
  const enzymeWrapper = shallow(<VideoList {...props} />);
  return {
    props,
    enzymeWrapper
  }
}

describe('Video List component', () => {
  describe('interactions with store', () => {
    let component, store, props;
    beforeEach(() => {
      const middlewares = [thunk.withExtraArgument(YoutubeAPI)];
      const mockStore = configureMockStore(middlewares);
      store = mockStore({videos: [{etag: 1}, {etag: 2}], videoSelected: {etag: 1}});
      props = {
        videos: [
          {
            etag: 1,
            snippet: {
              title: 'title example 1',
              thumbnails: {
                default: {
                  url: 'www.google.com'
                }
              }
            }
          },
          {
            etag: 2,
            snippet: {
              title: 'title example 2',
              thumbnails: {
                default: {
                  url: 'www.google.com'
                }
              }
            }
          }
        ]
      }
    });
    it('should call componentDidMount', () => {
      sinon.spy(VideoList.prototype, 'componentDidMount');
      component = mount(
        <Provider store={store}>
          <VideoList {...props} dispatch={store.dispatch}/>
        </Provider>
      );
      expect(VideoList.prototype.componentDidMount.calledOnce).to.equal(true);
      //console.log(wrapper.find('li'));
    });
    it('should render 2 <VideoListItem', () => {
      expect(component.find(VideoListItem)).to.have.length(2);
    });
  });
  describe('render shallow', () => {
    it('should render a ul', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('ul')).to.have.length(1);
    });
  })
})