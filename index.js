const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const multer = require('multer');
require('dotenv/config');

const port = process.env.PORT || 3013;
const app = express();

const login = require('./Routes/login');
const boards = require('./Routes/boards');
const cards = require('./Routes/cards');
const workspaces = require('./Routes/workspaces');

app.use(cors());
app.use(fileUpload());

app.use(express.json());
app.use('/', login);
app.use('/', boards);
app.use('/', cards);
app.use('/', workspaces);

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
});
