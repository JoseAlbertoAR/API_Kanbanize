const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv/config');

const port = process.env.PORT || 3013;

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    console.log('body: ', req.body);
    const values = {
        email: req.body.email, 
        pass: req.body.pass
    };
    const response = await fetch(`https://university6y.kanbanize.com/index.php/api/kanbanize/login//format/json`,
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    });
    const data = await response.json();
    res.json(data);
})

app.get('/', async (req, res) => {
    /*const values = {
        email: req.body.email, 
        pass: req.body.pass
    };*/
    const values = {
        email: "matricula@tec.mx",
        pass: "contraseña"
    };
    const response = await fetch(`https://university6y.kanbanize.com/index.php/api/kanbanize/login//format/json`,
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)

    })
    const data = await response.json();
    console.log(values);
    res.json(data);
})


app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
});