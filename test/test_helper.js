import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../src/reducers';
import YoutubeAPI from '../src/api/youtube_api';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
global.navigator = {
   userAgent: 'node.js'
};
const $ = _$(window);

chaiJquery(chai, chai.util, $);

function renderComponent(ComponentClass, props = {}, state = {}) {
  const middlewares = [thunk.withExtraArgument(YoutubeAPI)];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({ videos: [], videoSelected: {} });
  const componentInstance =  TestUtils.renderIntoDocument(
    <Provider store={store}>
      <ComponentClass {...props} />
    </Provider>
  );
  return {
    store,
    component: $(ReactDOM.findDOMNode(componentInstance))
  }
}

$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

export {renderComponent, expect};
