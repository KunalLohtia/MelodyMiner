import axios from 'axios';
import React from 'react';

import {SPOTIFY_CLIENT, SPOTIFY_CLIENT_SECRET} from '@env';

// Spotify API credentials
const SPOTIFY_CLIENT_ID = `${SPOTIFY_CLIENT}`;
const SPOTIFY_CLIENT_SECRET_ID = `${SPOTIFY_CLIENT_SECRET}`;

// buffer module via node
const Buffer = require('buffer').Buffer;

// Base64 encoding of auth header
// using form of client_id:client_secret
const authHeader = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET_ID}`,
).toString('base64');

// Spotify token endpoint
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

//using client credentials grant flow to get access token
//since we are just accessing catalog endpoints, and not spotify user info or endpoints

// async function to get Spotify access token
const getAccessToken = async () => {
  try {
    // see if response promise contains access token via async and await
    // post request to spotify token endpoint
    const response = await axios.post(
      TOKEN_URL,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authHeader}`,
        },
      },
    );
    // return access token
    return response.data.access_token;
  } catch (error) {
    // error for failing to retrieve access token
    console.error('Error getting access token:', error);
    throw error;
  }
};

//search for tracks function
//used after user inputs their tracks and artists who made them

export const searchTracks = async query => {
  // access token used as a promise
  const token = await getAccessToken();
  // store search url and use query prop to represent user inputs
  const SEARCH_URL = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`;

  try {
    // retrieve url as a promise
    const response = await axios.get(SEARCH_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // return the json response
    return response.data.tracks.items;
  } catch (error) {
    // error for endpoint failing
    console.error('Error searching tracks:', error);
    throw error;
  }
};
