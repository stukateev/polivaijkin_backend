require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes');


const { PORT = 3000, DB_PATH = 'mongodb://127.0.0.1:27017/polivaijkin' } = process.env;
const app = express();

const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/handleError');
const { errorLogger, requestLogger } = require('./middlewares/loggerHandler');
const { createUser, login, clearCookie } = require('./controllers/users');


const cors = require('cors');
const allowedOrigins = [
  'localhost:3000',
  'http://localhost:3000',
  "https://polivaijkin.shop",
  "http://polivaijkin.shop",
  "https://xn--80adrcegcwbj.xn--p1ai",
  "http://xn--80adrcegcwbj.xn--p1ai"
]

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

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);
app.post('/signout', clearCookie);

app.use(routes);
app.use(errors());
app.use(errorLogger);
app.use(errorsHandler);

mongoose.connect(DB_PATH);

app.listen(PORT);
