<a id="readme"></a>

# Alcheify

<!--LOGO-->
<div align="center">
<img width="128" height="128" alt="alcheify" src="https://github.com/user-attachments/assets/5395e40d-f215-4a8f-8853-9df76b169d5d" />

An alchemy themed AI-powered playlist generator for Spotify.</div>

<!--TABLE OF CONTENTS-->
<details>
  <summary>Table of Contents: </summary>
  <ol>
    <li>
      <a href="#about">About</a>
    </li>
    <li>
      <a href="#usage">Running the Website Locally</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#preview">Preview</a></li>
      </ul>
    </li>
    <li><a href="#screenshots">Screenshots</a></li>
    <li><a href="#credits">Credits</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About
Alcheify uses Google's Gemini API with Spotify's Web API to "Brew a Playlist." Users fill out a form to customize their "Playlist Potion," and their responses are then given to Gemini through a custom prompt I created, who then uses those responses to decide on the tracklist for the playlist. Alcheify creates a Spotify playlist on the users account and adds the tracks Gemini came up with (as long as they are actually on Spotify :smile:). 

One of the most frustrating things to me with other AI playlist generators I've seen is that they almost exclusively return extremely popular artists and their more popular songs, regardless of the kind of playlist you ask for. Alcheify automatically gives you a more diverse playlist, allowing users to discover new music easier. Additionally, there are extra customization options (the "ingredients") on the form to further refine the results.

Project svgs aside from the Spotify logo are custom made with Inkscape.

<div align="center">
<img width="68" height="90" alt="potion" src="https://github.com/user-attachments/assets/da5c1085-6e79-41c5-b204-4756b82a33f2" /><a id="readme"></a></div>

### Playlist Potion Ingredients
1. "The Essence" -> Primary ingredient
  * A description of the vibe of the playlist the user wants to create
2. "Reagants" -> Secondary ingredient(s)
  * Using a full Spotify autocomplete song search bar, users can select one or more reference songs. If reference songs are provided, the user then has the option to either include those songs in the playlist or simply use them as inspo for Gemini
3. "Modifiers" -> Extra customization. Users can choose:
  * Artists to exclude from the playlist
  * Genres to exclude from the playlist
  * Whether artists can appear more than once
  * If they want Gemini to generate a playlist title and description or not (Default is the title "AI Generated Playlist" with no description)
4. "Additional Notes" -> Anything extra the user would like Gemini to take into consideration

### Built With

![Next JS](https://img.shields.io/badge/Next-%23000.svg?style=for-the-badge&logo=next.js&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)


## Usage
The following section describes how to download and use the **Alcheify** application locally.

### Prerequisites
- [Node.js](https://nodejs.org/en)
- npm (installed as part of Node installation)
- A Client ID and client secret from [Spotify](https://developer.spotify.com/documentation/web-api/tutorials/getting-started)
    - You do not need to request an access token. Just follow the "Set Up Your Account" and "Create an app" steps.
    - Set your redirect URI to 'http://127.0.0.1:3000/api/callback'
- A [Gemini API](https://ai.google.dev/gemini-api/docs/get-started) key 
    - Again, you only need to create the key

### Installation
1. Clone the repository

```
git clone https://github.com/hnethercutt/alcheify.git
```

2. Install dependencies in project folder
```
npm install
```

3. Create a ".env.local" file and place it in the root of the project

4. Add the following to the .env.local file:
```
CLIENT_ID=YOUR-SPOTIFY-CLIENT-ID
CLIENT_SECRET=YOUR-SPOTIFY-CLIENT-SECRET
REDIRECT_URI=http://127.0.0.1:3000/api/callback
GEMINI_API_KEY=YOUR-GEMINI-API-KEY
HOST=127.0.0.1
PORT=3000
```

* If you need to use a port other than 3000, you can change the PORT variable, just make sure you also change it in the redirect URI in both the .env.local file and in your Spotify app settings.

### Preview

The following will execute the npm script to start the development server with hot-reload enabled

```
npm run dev
```

<p align="right">(<a href="#readme">Back to top</a>)</p>

## Screenshots

<div align="center">
  <img width="500 alt="Landing Page" src="https://github.com/user-attachments/assets/16e7ecb7-dfd7-45e6-aff8-fd3194aab05f" /></br>
  <a href="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXNlYTN0NDNoZXBhZmVhNHZid3d0c3M5ZWxzeHdsZ2YweDB1enNkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/K5rG9Q9uDAnlvBAwbz/giphy.gif">Click to View Landing Page Animated GIF</a></br></br>
  <img width="500 alt="Blank Form" src="https://github.com/user-attachments/assets/d614524e-141e-4136-a81d-a25988fa7c00" />
  <img width="500 alt="Chips" src="https://github.com/user-attachments/assets/957220e8-7593-44d6-8fe5-7791bb136496" />
  <img width="500 alt="Song Search" src="https://github.com/user-attachments/assets/f6beb439-ad16-4e23-8f3a-1acefdb3768b" />
  <img width="500 alt="Artist Search" src="https://github.com/user-attachments/assets/f6ed15df-5391-40ff-a713-781254a49d71" />
  <img width="500 alt="Genres" src="https://github.com/user-attachments/assets/7f70b66c-5558-4907-a266-06049fe6abf8" /></br>
  <img width="500 alt="Brew Playlist" src="https://github.com/user-attachments/assets/0c010494-fb3c-4650-aad7-3837293df705" />
  <img width="500 alt="Success" src="https://github.com/user-attachments/assets/bbda6a78-0e95-4017-979d-96c243404b61" /></br>
  <a href="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnBtZWNncDBkYTFhY2J0dDFhb3psazZrZHN3YTI3MzMzbjl3YmJvOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2Yur2zZPnt8HFlGtuv/giphy.gif">Click to View Brew Playlist Animated GIF</a>
</div>

## Credits

For the background animation and loading screen animation, I used the following codepens as a starting point. I just converted the code to typescript/CSS and made modifications (colors, adding my custom icon to the loading animation, etc). I still wanted to give some credit to these users.

[CSS Particle Animation (no JavaScript) by tonkotsuboy](https://codepen.io/tonkotsuboy/pen/xaMVpo)

[CSS Particles by rauldronca](https://codepen.io/rauldronca/pen/LgXPgJ)

## License

Alcheify is licensed under the MIT License. See [LICENSE.txt](LICENSE.txt) for more information.

<p align="right">(<a href="#readme">Back to top</a>)</p>
