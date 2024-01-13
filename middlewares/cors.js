const cors = require('cors');
const express = require('express');
const app = express();

const allowedCors = [
  'http://localhost:3000',
  'https://localhost:3000',
  'https://polivaijkin.shop',
  'http://polivaijkin.shop',
  'https://xn--80adrcegcwbj.xn--p1ai',
  'http://xn--80adrcegcwbj.xn--p1ai',
  'http://62.84.118.250:443',
  'https://62.84.118.250:443'

];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept',
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));