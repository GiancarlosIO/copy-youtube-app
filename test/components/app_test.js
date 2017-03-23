import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { renderComponent , expect } from '../test_helper';
import App from '../../src/components/app';
import { mount } from 'enzyme';
import sinon from 'sinon';
import configureMockStre from 'redux-mock-store';
import thunk from 'redux-thunk';
import YoutubeAPI from '../../src/api/youtube_api';
import { VideoList } from '../../src/components/video_list';
import { SearchBar } from '../../src/components/search_bar';
import { VideoDetail } from '../../src/components/video_detail';


describe('App' , () => {
  let component, store, props;
  beforeEach(() => {
    const middlewares = [thunk.withExtraArgument(YoutubeAPI)];
    const mockStore = configureMockStore(middlewares);
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
      ],
      videoSelected: {
          etag: 1,
          snippet: {
            title: 'title example 1',
            thumbnails: {
              default: {
                url: 'www.google.com'
              }
            }
          }
        }
    }
    store = mockStore(props);
    component = mount(
      <Provider store={store}>
        <App />
      </Provider>
    )
  });
  it('should render childs component', () => {
    expect(component.find('.app')).to.have.length(1);
    expect(component.find(VideoList)).to.have.length(1);
    expect(component.find(VideoDetail)).to.have.length(1);
    expect(component.find(SearchBar)).to.have.length(1);
  })
});
