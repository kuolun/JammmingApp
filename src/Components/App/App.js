import React, { Component } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import PlayList from "../PlayList/PlayList";
import Spotify from "../../util/Spotify";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: "cherry",
      playlistTracks: [{ id: 2, name: "c", artist: "cc", album: "haha" }],
      searchResults: [{ id: 1, name: "k", artist: "kuolun", album: "test" }]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    let newTrack = true;
    this.state.playlistTracks.forEach(pTrack => {
      if (pTrack.id === track.id) {
        newTrack = false;
      }
    });
    if (newTrack) {
      this.setState(currentState => currentState.playlistTracks.push(track));
    }
  }
  removeTrack(track) {
    let newTrack = this.state.playlistTracks.filter(
      pTrack => pTrack.id !== track.id
    );
    this.setState(() => ({
      playlistTracks: newTrack
    }));
  }
  updatePlaylistName(name) {
    this.setState(() => ({
      playlistName: name
    }));
  }
  savePlaylist() {
    let trackURIs = [];
  }
  search(term) {
    Spotify.search(term);
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist" />
          <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}
          />
          <PlayList
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
          />
        </div>
      </div>
    );
  }
}

export default App;
