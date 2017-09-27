let ACCESS_TOKEN;
const CLIENT_ID = "d5d4f49c39b64fc094310e432f55a62d";
const REDIRECT_URI = "http://localhost:3000/";
let expiresIn;

let Spotify = {
  getAccessToken: function() {
    console.log(ACCESS_TOKEN);
    if (ACCESS_TOKEN) {
      return ACCESS_TOKEN;
    } else {
      let arr = window.location.href.match(/access_token=([^&]*)/);
      //no parameter exist in access_token
      if (arr !== null) {
        ACCESS_TOKEN = arr[0].split("=")[1];
        arr = window.location.href.match(/expires_in=([^&]*)/);
        expiresIn = arr[0].split("=")[1];
        // handle expire
        window.setTimeout(() => (ACCESS_TOKEN = ""), expiresIn * 1000);
        console.log(expiresIn);
        console.log(ACCESS_TOKEN);
        //clear url parameter
        window.history.pushState("Access Token", null, "/");
        return ACCESS_TOKEN;
      } else {
        // access token empty and not in URL, redirect to API
        window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
      }
    }
  },
  search: function(term) {
    ACCESS_TOKEN = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    })
      .then(
        response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Request failed!");
        },
        netWorkError => console.log(netWorkError.message)
      )
      .then(jsonResponse => {
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          };
        });
      });
  }
};

export default Spotify;
