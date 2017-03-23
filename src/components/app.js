import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import SearchBar from './search_bar';
import VideoList from './video_list';
import VideoDetail from './video_detail';



class App extends Component {

  render() {
    return (
      <div className="app">
        <SearchBar />
        <VideoDetail />
        <VideoList />
      </div>
    );
  }
}

export default App;

// youtube api key AIzaSyA_GqEUG4i2XDK_jLGwA5AHaP-7gGdOpN4