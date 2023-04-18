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

app.post('/workspaces', async (req,res) =>{
    const apikey = req.body.apikey;
    console.log(req.body);

    try{
        const response = await  fetch(`https://university6y.kanbanize.com/api/v2/workspaces?if_assigned_to_boards=1&is_archived=0`, {
            method: "get",
            headers: {
                "apikey": apikey,
                "workspace_id": workspace_id
            },
        })
        if (response.ok){
            const data = await response.json();
            //const workSpaces = data.data;
            res.json(data);
            console.log("Workspaces: ", data);
        }
        else{
            res.json({"error": response.status});
        }
    }
    catch(error){
        console.error(error);
        res.json({"error": error});
    }
})

app.post('/boards', async (req,res) =>{
    const apikey = req.body.apikey;
    const workspace_ids= req.body.workspace_id;
    console.log(req.body);

    try{
        const response = await  fetch(`https://university6y.kanbanize.com/api/v2/boards?is_archived=0&if_assigned=1&fields=board_id&expand=workflows
        `, {
            method: "get",
            headers: {
                "apikey": apikey
            },

        })
        if (response.ok){
            const data = await response.json();
            //const workSpaces = data.data;
            res.json(data);
            console.log("Boards: ", data);
        }
        else{
            res.json({"error": response.status});
        }
    }
    catch(error){
        console.error(error);
        res.json({"error": error});
    }
})



app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
});
