import { PlaylistRequest, SpotifySong, SpotifyArtist } from "@/types/playlist";
import _ from 'lodash';

// Creates an empty playlist on the users account
export async function generatePlaylist(requestData: PlaylistRequest): Promise<string> {
    const res = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt: requestData }),
    });

    // The generate api handles the entire playlist generation process, so by this point the user has their playlist
    const result = await res.json();

    if(result.error) {
        throw new Error(result.error);
    }
    // So all we need to return is the url in order to embed the playlist on the success page
    return result.playlistUrl;
}

// For the autocomplete song search bar
export async function fetchSongSearchResults(searchTerm: string): Promise<Array<SpotifySong>> {
    let spotifySongs: SpotifySong[] = [];

    await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}&type=track`).then(async function(_apiResponse) {
        const searchResults = await _apiResponse.json();
        // Need to convert each song to the custom SpotifySong type
        spotifySongs = _.map(searchResults.items, function(_searchResultItem) {
            let songArtists: string[] = [];
            // Put all artists together for each song so featured artists can be displayed
            _.forEach(_searchResultItem.artists, function(_artist) {
                songArtists.push(_artist.name);
            });

            return {
                title: _searchResultItem.name,
                artists: songArtists.join(', '),
                album: _searchResultItem.album.name,
                // 3rd image is the largest, so pulling that one specifically
                coverArtUrl: _searchResultItem.album.images[2].url,
                id: _searchResultItem.id
            }
        });
    }).catch((err: Error) => {
        console.error('Error retrieving search results', err.message);
    });

    return spotifySongs;
}

// For the autocomplete artist search bar
export async function fetchArtistSearchResults(searchTerm: string): Promise<Array<SpotifyArtist>> {
    let spotifyArtists: SpotifyArtist[] = [];

    await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}&type=artist`).then(async function(_apiResponse) {
        const searchResults = await _apiResponse.json();
        // Need to convert each artist to the custom SpotifyArtist type
        spotifyArtists = _.map(searchResults.items, function(_searchResultItem) {
            return {
                name: _searchResultItem.name,
                // Again, the largest image. Need to error handle this on UI side when the url is blank
                imageUrl: _searchResultItem.images[2] ? _searchResultItem.images[2].url : '',
                id: _searchResultItem.id
            }
        });
    }).catch((err: Error) => {
        console.error('Error retrieving search results', err.message);
    });

    return spotifyArtists;
}

// Used to get the html code to embed the playlist
export async function fetchSpotifyPlaylist(playlistUrl: string): Promise<string> {
    const response = await fetch(`https://open.spotify.com/oembed?url=${playlistUrl}`);
    const data = await response.json();
    return data.html;
}