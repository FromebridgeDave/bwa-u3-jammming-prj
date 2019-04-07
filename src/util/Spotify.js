//82. At the top of Spotify.js create constant variables for your application’s client ID and redirect URI.
//Set the client ID variable to the value provided on your application page.
//Set the redirect URI to "http://localhost:3000/".

const clientId = '819f72ec432546a9bc99c85e01e3b459';
const redirectUri = 'http://localhost:3000/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.


let userAccessToken;

const Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    }
//79.If the access token is not already set, check the URL to see if it has just been obtained.
//You will be using the Implicit Grant Flow to setup a user’s account and make requests.
//The implicit grant flow returns a user’s access token in the URL.
//Use the guide to determine how to parse the URL and set values for your access token and expiration time.

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      userAccessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return userAccessToken;
    } else {

//81.The third condition is that the access token variable is empty and is not in the URL.
//Before you write this conditional code block, you need to register your application using the Spotify application registration flow.
//Give your application a relevant name and description. Also, add the following Redirect URI:
//http://localhost:3000/


//83. Back in your conditional statement, redirect users to the following URL:
//https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=token&scope=playlist-modify-public&redirect_uri=REDIRECT_URI
//Interpolate your client ID and redirect URI variables In place of CLIENT_ID and REDIRECT_URI.
//To redirect a user, you must set window.location to the URL in the task above.

      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }
  },

  search(term) {
//86. Inside .search(), start the promise chain by returning a GET request (using fetch()) to the following Spotify endpoint:
//https://api.spotify.com/v1/search?type=track&q=TERM
//Replace the value of TERM with the value saved to the search term argument.
//Add an Authorization header to the request containing the access token.

  const userAccessToken = Spotify.getAccessToken();
  return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`
    }

//87.Convert the returned response to JSON.
//Then, map the converted JSON to an array of tracks. If the JSON does not contain any tracks, return an empty array.
//The mapped array should contain a list of track objects with the following properties:
//ID — returned as track.id
//Name — returned as track.name
//Artist — returned as track.artists[0].name
//Album — returned as track.album.name
//URI — returned as track.uri

  }).then(response => {
    return response.json();
  }).then(jsonResponse => {
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  });
},
//90.Create a method in Spotify.js that accepts two arguments. The first argument is the name of the playlist. The second is an array of track URIs.
//Inside the function, check if there are values saved to the method’s two arguments. If not, return.


  savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) {
      return;
    }
      //91.Create three default variables:
    //An access token variable, set to the current user’s access token
    //A headers variable, set to an object with an Authorization parameter containing the user’s access token
    //in the implicit grant flow request format
    //An empty variable for the user’s ID

    const userAccessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${userAccessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: playlistName})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
}
export default Spotify;
