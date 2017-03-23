import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyA_GqEUG4i2XDK_jLGwA5AHaP-7gGdOpN4';

const YoutubeAPI = {
  searchVideos: (term) => {
    return new Promise(
      (resolve, reject) => {
        YTSearch({
          key: API_KEY,
          term: term},
          (videos) => {
            if (videos.length > 0 ) {
              resolve(videos);
            } else {
              reject('Not found');
            }
          }
        );
      }
    )
  }
}
export default YoutubeAPI;