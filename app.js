require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const cors = require('./middlewares/cors');
const generateSitemap = require('./controllers/generateSitemap');

const { PORT = 3000, DB_PATH = 'mongodb://127.0.0.1:27017/polivaijkin' } = process.env;
const app = express();

const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/handleError');
const { errorLogger, requestLogger } = require('./middlewares/loggerHandler');
const { createUser, login, clearCookie } = require('./controllers/users');




app.use(cors);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(bodyParser.json());
app.use(cookieParser());


app.use(requestLogger);

// Обработчик маршрута для генерации sitemap
app.get('/api/sitemap.xml', async (req, res) => {
  try {
    const sitemapXml = await generateSitemap(); // Генерируем sitemap
    if (!sitemapXml) {
      return res.status(500).send('Error generating sitemap');
    }
    res.header('Content-Type', 'application/xml');
    res.send(sitemapXml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});


app.post('/signin', login);
app.post('/signup', createUser);
app.post('/signout', clearCookie);

app.use(routes);
app.use(errors());
app.use(errorLogger);
app.use(errorsHandler);

mongoose.connect(DB_PATH);

app.listen(PORT);
