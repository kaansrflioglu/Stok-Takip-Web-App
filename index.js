const express = require('express');
const { engine } = require('express-handlebars'); 
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes/router');
const moment = require('moment');

const app = express();
const PORT = 3000;

app.engine('handlebars', engine({
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'views/layouts'), 
  extname: '.handlebars', 
  helpers: {
    formatDate: (date) => moment.tz(date, 'YYYY-MM-DD / HH:mm', 'Europe/Istanbul').format('YYYY-MM-DD / HH:mm')
  }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views/pages')); 

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

app.use((req, res, next) => {
  res.render("404");
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Sunucu http://127.0.0.1:${PORT} adresinde çalışıyor.`);
});
