import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers/';
import YoutubeAPI from './api/youtube_api';

import App from './components/app';

const store = createStore(reducers, applyMiddleware(ReduxThunk.withExtraArgument(YoutubeAPI)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('container')
)