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
        pass: req.body.pass,
        dom: req.body.dom
    };
    const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/index.php/api/kanbanize/login//format/json`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        });
    const data = await response.json();
    res.json(data);
})

app.post('/workspaces', async (req, res) => {
    const apikey = req.body.apikey;
    const kanbanizeUrl = req.body.dom;

    try {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/workspaces?if_assigned_to_boards=1&is_archived=0`, {
            method: "get",
            headers: {
                "apikey": apikey,
                // "workspace_id": workspace_id
            },
        })
        if (response.ok) {
            const data = await response.json();
            //const workSpaces = data.data;
            res.json(data);
            console.log("Workspaces: ", data);
        }
        else {
            res.json({ "error": response.status });
        }
    }
    catch (error) {
        console.error(error);
        res.json({ "error": error });
    }
})

app.post('/boards', async (req, res) => {
    const apikey = req.body.apikey;
    const kanbanizeUrl = req.body.dom;

    try {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/boards?is_archived=0&if_assigned=1&fields=board_id,workspace_id,name&expand=workflows`, {
            method: "get",
            headers: {
                "apikey": apikey
            },

        })
        if (response.ok) {
            const data = await response.json();
            res.json(data);
            console.log("Boards: ", data);
        }
        else {
            res.json({ "error": response.status });
        }
    }
    catch (error) {
        console.error(error);
        res.json({ "error": error });
    }
})

app.post('/workflows', async (req, res) => {
    const apikey = req.body.apikey;
    const kanbanizeUrl = req.body.dom;
    // const b_ID = 21;
    const b_ID = req.body.b_ID; //board_id

    try {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/boards/${b_ID}/workflows`, {
            method: "get",
            headers: {
                "apikey": apikey
            },
        })
        if (response.ok) {
            const data = await response.json();
            res.json(data);
            console.log("Workflows: ", data);
        } else {
            res.json({ "error": response.status });
        }
    } catch (error) {
        console.error(error);
        res.json({ "error": error });
    }
    console.log("Board ID: ", b_ID);
})


app.post('/columns', async (req, res) => {
    const apikey = req.body.apikey;
    const kanbanizeUrl = req.body.dom;
    // const b_ID = 21; //req.params.b_ID; //board_id
    const b_ID = req.body.b_ID; //board_id


    try {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/boards/${b_ID}/columns?fields=column_id,workflow_id,parent_column_id,name`, {
            method: "get",
            headers: {
                "apikey": apikey
            },

        })
        if (response.ok) {
            const data = await response.json();
            res.json(data);
            console.log("Boards: ", data);
        }
        else {
            res.json({ "error": response.status });
        }
    }
    catch (error) {
        console.error(error);
        res.json({ "error": error });
    }
})


app.post('/cards', async (req, res) => {
    const apikey = req.body.apikey;
    const kanbanizeUrl = req.body.dom;
    // const b_ID = 21; //req.params.b_ID; //board_id
    const b_ID = req.body.b_ID; //board_id

    try {
        // const response = await fetch(`https://university6y.kanbanize.com/api/v2/cards?board_ids=${b_ID}&workflow_ids=${w_ID}&column_ids=${c_ID}&fields=card_id,title,priority,deadline,board_id,workflow_id,column_id&expand=co_owner_ids`, {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/cards?board_ids=${b_ID}&fields=card_id,title,owner_user_id,type_id,priority,deadline,workflow_id,column_id&expand=co_owner_ids`, {
            method: "get",
            headers: {
                "apikey": apikey
            },

        })
        if (response.ok) {
            const data = await response.json();
            res.json(data);
            console.log("Boards: ", data);
        }
        else {
            res.json({ "error": response.status });
        }
    }
    catch (error) {
        console.error(error);
        res.json({ "error": error });
    }
})

app.post('/users', async (req, res) => {
    const apikey = req.body.apikey;
    const kanbanizeUrl = req.body.dom;

    try {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/users?fields=user_id,username,realname&expand=board_roles`, {
            method: "get",
            headers: {
                "apikey": apikey
            },
        })
        if (response.ok) {
            const data = await response.json();
            res.json(data);
            // console.log("Users: ", data);
        } else {
            res.json({ "error": response.status });
        }
    } catch (err) {
        console.error(err);
        res.json({ "error": err });
    }
})

app.post('/cards/create', async (req, res) => {
    //esta ruta crea una tarjeta en el tablero
    const apikey = req.headers.apikey;
    const kanbanizeUrl = req.headers.dom;
    //const values = {column_id: req.body.c_ID, lane_id: req.body.w_ID, title: req.body.title, deadline: req.body.deadline, owner_user_id: req.body.owner_user_id, priority: req.body.priority}
    //const values = {column_id: req.body.c_ID, lane_id: req.body.w_ID, title: req.body.title}

    const column_id = req.body.column_id;
    const lane_id = req.body.lane_id;
    const title = req.body.title;
    const deadline = req.body.deadline;
    const owner_user_id = req.body.owner_user_id;
    const priority = req.body.priority;

    const formData = JSON.stringify({
        "column_id": column_id,
        "lane_id": lane_id,
        "title": title,
        "deadline": deadline,
        "owner_user_id": owner_user_id,
        "priority": priority
    })

    try {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/cards`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charsetx=utf8",
                "apikey": apikey,
                "dom": kanbanizeUrl
            },
            // body: JSON.stringify(values)
            body: formData,

        });
        if (response.ok) {
            const data = await response.json();
            res.json(data);
            //console.log("Boards: ", data);
        }
        else {
            res.json({ "error": response.status });
        }
    }
    catch (error) {
        console.error(error);
        res.json({ "error": error });
    }
})

app.patch('/cards/move', async (req, res) => {
    const apikey = req.headers.apikey;
    const kanbanizeUrl = req.headers.dom;
    const card_id = req.headers.card_id;
    const column_id = req.body.c_ID//values = {column_id: req.body.c_ID}

    const formData = JSON.stringify({
        "column_id": column_id
    })
    try {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/cards/${card_id}`,
        {
            method: "patch",
            headers: {
                "Content-Type": "application/json; charset=utf8",
                "apikey": apikey,
                "dom": kanbanizeUrl,
                "card_id": card_id
            },
            //body: JSON.stringify(values)
            body: formData,

        })
        if (response.ok) {
            const data = await response.json();
            res.json(data);
            //console.log("card: ", data);
        }
        else {
            res.json({ "error": response.status });
        }
    }
    catch (error) {
        console.error(error);
        res.json({ "error": error });
    }
})

app.post('/cards/comments', async (req, res) => {
    const apikey = req.header.apikey;
    const kanbanizeUrl = req.header.dom;
    // const b_ID = 21; //req.params.b_ID; //board_id
    const card_id = req.body.c_ID; //board_id
    try {
        // const response = await fetch(`https://university6y.kanbanize.com/api/v2/cards?board_ids=${b_ID}&workflow_ids=${w_ID}&column_ids=${c_ID}&fields=card_id,title,priority,deadline,board_id,workflow_id,column_id&expand=co_owner_ids`, {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/cards/${c_ID}/comments`, {
            method: "get",
            headers: {
                "apikey": apikey,
                "dom": kanbanizeUrl
            },
        })
        if (response.ok) {
            const data = await response.json();
            res.json(data);
            console.log("Comments: ", data);
        }
        else {
            res.json({ "error": response.status });
        }
    }
    catch (error) {
        console.error(error);
        res.json({ "error": error });
    }
})

app.post('/cards/comments/create', async (req, res) => {
    //esta ruta crea un comentario en una tarjeta
    const apikey = req.headers.apikey;
    const kanbanizeUrl = req.headers.dom;
    const card_id = req.body.c_ID;
    //const text = req.body.text;
    //const values = {column_id: req.body.c_ID, lane_id: req.body.w_ID, title: req.body.title}
    const values = {text: req.body.text};

    try {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/cards/${c_ID}/comments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charsetx=utf8",
                "apikey": apikey,
                "dom": kanbanizeUrl
            },
            body: JSON.stringify(values)
            //body: formData,

        });
        if (response.ok) {
            const data = await response.json();
            res.json(data);
            //console.log("Comments: ", data);
        }
        else {
            res.json({ "error": response.status });
        }
    }
    catch (error) {
        console.error(error);
        res.json({ "error": error });
    }
})

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
});
