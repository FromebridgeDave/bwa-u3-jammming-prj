import React from 'react';
import './App.css';
import Spotify from '../../util/Spotify';

/*import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
*/
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        searchResults: [],
        playlistName: 'Daves New Playlist',
        playlistTracks: ['A kind of magic','Bohemian Rhapsody']
      };
      this.search = this.search.bind(this);
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
    }
//method to add tracks
  addTrack(track) {
  let tracks = this.state.playlistTracks;
  tracks.push(track);
  if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
    return this.setState({playlistTracks: tracks});;
  }
}
//method to remove tracks
removeTrack(track) {
   let tracks = this.state.playlistTracks;
   tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

   this.setState({playlistTracks: tracks});
 }
//method to update playlist onNameChange
 updatePlaylistName(name) {
  this.setState({playlistName: name});
}
//63.
//In App.js create a method called savePlaylist with the following functionality:
//Generates an array of uri values called trackURIs from the playlistTracks property.
//64.Bind the current value of this to .savePlaylist().
//Pass savePlaylist to the Playlist component as an attribute called onSave
savePlaylist() {
   const trackUris = this.state.playlistTracks.map(track => track.uri);
   Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
     this.setState({
       playlistName: 'New Playlist',
       playlistTracks: []
     });
   });
 }

//67.In App.js create a method called search with the following functionality:
//Accepts a search term
//Logs the term to the console

//68.In the App constructor method, bind this to .search().
//In a later assessment, we will use this in .search().
//Pass .search() to the SearchBar component as an onSearch attribute.

search(term) {
  Spotify.search(term).then(searchResults => {
    this.setState({searchResults: searchResults});
  });
}

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack} />
            <Playlist playlistTracks={this.state.playlistTracks}
                      onNameChange={this.updatePlaylistName}
                      onRemove={this.removeTrack}
                      onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
