import React from 'react';
import { renderComponent, expect } from '../test_helper';
import SearchBarConnected, { SearchBar } from '../../src/components/search_bar';
import jsdom from 'jsdom';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import YoutubeAPI from '../../src/api/youtube_api';
import { Provider } from 'react-redux';
import react from 'react';

describe('SearchBar component', () => {
  it('render the input search box ', () => {
    const component = renderComponent(SearchBarConnected).component;
    expect(component.find('input')).to.exist;
  });

  describe('user entry text in input', () => {
    it('show <cards> in the input', () => {
      const component = renderComponent(SearchBarConnected).component;
      component.find('input').simulate('change', 'cards');
      expect(component.find('input')).to.have.value('cards');
    });

    it('dispatch 2 actions after a an asyn action searchVideos', () => {
      const middlewares = [thunk.withExtraArgument(YoutubeAPI)];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore({videos: [], videoSelected: {}});
      const wrapper = mount(
        <Provider store={store}>
          <SearchBar dispatch={store.dispatch}/>
        </Provider>
      );
      expect(store.getActions()).to.have.length(0);
      wrapper.find('input').simulate('change', 'abc');
      setTimeout(() => {
        expect(store.getActions()).to.have.length(2);
        expect(store.getActions()[0].type).to.equal('SAVE_NEW_VIDEOS');
        expect(store.getActions()[1].type).to.equal('SELECT_VIDEO');
      }, 3000);
    })
  });
})