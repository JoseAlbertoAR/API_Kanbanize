const fetch = require('node-fetch');

module.exports.cards = async (req, res) => {
    const apikey = req.body.apikey;
    // const b_ID = 21; //req.params.b_ID; //board_id
    const b_ID = req.body.b_ID; //board_id

    try {
        // const response = await fetch(`https://university6y.kanbanize.com/api/v2/cards?board_ids=${b_ID}&workflow_ids=${w_ID}&column_ids=${c_ID}&fields=card_id,title,priority,deadline,board_id,workflow_id,column_id&expand=co_owner_ids`, {
        const response = await fetch(`https://university6y.kanbanize.com/api/v2/cards?board_ids=${b_ID}&fields=card_id,title,owner_user_id,type_id,priority,deadline,workflow_id,column_id&expand=co_owner_ids`, {
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
}

module.exports.users = async (req, res) => {
    const apikey = req.body.apikey;

    try {
        const response = await fetch(`https://university6y.kanbanize.com/api/v2/users?fields=user_id,username,realname&expand=board_roles`, {
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
}

module.exports.cardsCreate = async (req, res) => {
    //esta ruta crea una tarjeta en el tablero
    const apikey = req.headers.apikey;
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
        const response = await fetch(`https://university6y.kanbanize.com/api/v2/cards`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charsetx=utf8",
                "apikey": apikey
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
}

// app.post('/cards/move', async (req, res) => {
//     const apikey = req.body.apikey;
//     const values = {column_id: req.body.c_ID, lane_id: req.body.w_ID, title: req.body.title, deadline: req.body.deadline, owner_user_id: req.body.owner_user_id, priority: req.body.priority}
//     try {
//         const response = await fetch(`https://university6y.kanbanize.com/api/v2/cards`,
//         {
//             method: "patch",
//             headers: {
//                 "Content-Type": "application/json", charset: "utf-8",
//                 "apikey": apikey
//             },
//             body: JSON.stringify(values)

//         })
//         if (response.ok) {
//             const data = await response.json();
//             res.json(data);
//             console.log("Boards: ", data);
//         }
//         else {
//             res.json({ "error": response.status });
//         }
//     }
//     catch (error) {
//         console.error(error);
//         res.json({ "error": error });
//     }
// })

//         })
//         if (response.ok) {
//             const data = await response.json();
//             res.json(data);
//             console.log("Boards: ", data);
//         }
//         else {
//             res.json({ "error": response.status });
//         }
//     }
//     catch (error) {
//         console.error(error);
//         res.json({ "error": error });
//     }
// })

module.exports.cardsComments = async (req, res) => {
    const apikey = req.body.apikey;
    // const b_ID = 21; //req.params.b_ID; //board_id
    const card_id = req.body.c_ID; //board_id
    try {
        // const response = await fetch(`https://university6y.kanbanize.com/api/v2/cards?board_ids=${b_ID}&workflow_ids=${w_ID}&column_ids=${c_ID}&fields=card_id,title,priority,deadline,board_id,workflow_id,column_id&expand=co_owner_ids`, {
        const response = await fetch(`https://university6y.kanbanize.com/api/v2/cards/${c_ID}/comments`, {
            method: "get",
            headers: {
                "apikey": apikey
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
}

module.exports.cardsCommentsCreate = async (req, res) => {
    //esta ruta crea un comentario en una tarjeta
    const apikey = req.headers.apikey;
    const card_id = req.body.c_ID;
    //const text = req.body.text;
    //const values = {column_id: req.body.c_ID, lane_id: req.body.w_ID, title: req.body.title}
    const values = {text: req.body.text};

    try {
        const response = await fetch(`https://university6y.kanbanize.com/api/v2/cards/${c_ID}/comments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charsetx=utf8",
                "apikey": apikey
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
}

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
});
