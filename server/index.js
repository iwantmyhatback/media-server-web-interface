const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router.js');
const app = express();
const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../dist')));

app.use('/', router);

app.listen(port, () => console.log(`Server Listening At http://localhost:${port}`));
