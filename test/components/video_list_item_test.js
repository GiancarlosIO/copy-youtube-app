import { expect } from '../test_helper';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { VideoListItem } from '../../src/components/video_list_item';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import YoutubeAPI from '../../src/api/youtube_api';
import sinon from 'sinon';

describe('videoListItem component', () => {
  it('should render a .list-group-item', () => {
    const props = {
      video: {
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
    }
    const wrapper = shallow(<VideoListItem {...props} />);
    expect(wrapper.find('.list-group-item')).to.have.length(1);
  });

  it('should dispatch a action with click a item', () => {
    const middlewares = [thunk.withExtraArgument(YoutubeAPI)];
    const mockStore = configureMockStore(middlewares);
    const props = {
      video: {
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
    }
    const store = mockStore( { videoSelected: {etag: 1} });
    //sinon.spy(VideoListItem,'handleClickVideoListItem');
    const wrapper = mount(
      <Provider store={store}>
        <VideoListItem {...props} dispatch={store.dispatch}/>
      </Provider>
    );
    expect(store.getActions()).to.have.length(0);
    wrapper.find('.list-group-item').simulate('click');
    expect(store.getActions()[0].type).to.equal('SELECT_VIDEO');
    expect(store.getActions()[0].payload).to.equal(props.video);
  })
})
