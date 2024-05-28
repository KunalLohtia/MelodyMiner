import axios from 'axios';
import React from 'react';

import {SPOTIFY_CLIENT, SPOTIFY_CLIENT_SECRET} from '@env';

// Spotify API credentials
const SPOTIFY_CLIENT_ID = `${SPOTIFY_CLIENT}`;
const SPOTIFY_CLIENT_SECRET_ID = `${SPOTIFY_CLIENT_SECRET}`;

// Base64 encoding of auth header
// using form of client_id:client_secret
// const authHeader = Buffer.from(
//   `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
// ).toString('base64');
