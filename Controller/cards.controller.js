//Cosas para el firebase
const initializeApp = require('firebase/app').initializeApp;
const getStorage = require('firebase/storage').getStorage;
const ref = require('firebase/storage').ref;
const uploadBytes = require('firebase/storage').uploadBytes;
const getDownloadURL = require('firebase/storage').getDownloadURL;
// ^^^^ Cosas para el firebase ^^^^


const firebaseConfig = {
    apiKey: "AIzaSyD4ynh_mwAc-uBHTXGBSDqjG7K65bGqeAA",
    authDomain: "archivoskpe.firebaseapp.com",
    databaseURL: "https://archivoskpe-default-rtdb.firebaseio.com",
    projectId: "archivoskpe",
    storageBucket: "archivoskpe.appspot.com", //El unico que importa para hacer funcionar el storage
    messagingSenderId: "970382175255",
    appId: "1:970382175255:web:a00476ea674118509b4052"
  };

module.exports.cards = async (req, res) => {
    const apikey = req.body.apikey;
    const kanbanizeUrl = req.body.dom;
    // const b_ID = 21; //req.params.b_ID; //board_id
    const bID = req.body.bID; //board_id

    try {
        // const response = await fetch(`https://university6y.kanbanize.com/api/v2/cards?board_ids=${b_ID}&workflow_ids=${w_ID}&column_ids=${c_ID}&fields=card_id,title,priority,deadline,board_id,workflow_id,column_id&expand=co_owner_ids`, {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/cards?board_ids=${bID}&fields=card_id,title,owner_user_id,type_id,priority,deadline,workflow_id,column_id&expand=co_owner_ids`, {
            method: "get",
            headers: {
                "apikey": apikey,
                "domain": kanbanizeUrl,
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

module.exports.cardsCommentsAttachments = async (req, res) => {
    //esta ruta crea un comentario en una tarjeta
    const apikey = req.headers.apikey;
    const cardid = req.headers.cardid;
    const kanbanizeUrl = req.headers.dom;

    //Initialize Firebase
    const appF = initializeApp(firebaseConfig);
    //Initialize Cloud Storage and get a reference to the service
    const storage = getStorage(appF);
    var fileName;
    var downloadURL;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No se enviaron archivos");
    }

    try {
        fileName = req.files.archivo.name;
        const storageRef = ref(storage, fileName);
        const snaphot = await uploadBytes(storageRef, req.files.archivo.data);

        downloadURL = await getDownloadURL(storageRef);
        console.log("File available at: ", downloadURL);
        
    }
    catch (error) {
        //handle any errors that occur during the upload or retrieval process
        console.error('Error uploading file:' + error);
    }
    //const text = req.body.text;
    //const values = {column_id: req.body.c_ID, lane_id: req.body.w_ID, title: req.body.title}
    const text = req.body.text;
    const formData = JSON.stringify({
        "text": null,
        "attachments_to_add":[{
            "file_name": fileName,
            "link": downloadURL,
        }]
    });

    try {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/cards/${cardid}/comments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charsetx=utf8",
                "apikey": apikey,
                "domain": kanbanizeUrl,
                "cardid": cardid
            },
            body: formData,
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


module.exports.users = async (req, res) => {
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
}

module.exports.cardsCreate = async (req, res) => {
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
                "domain": kanbanizeUrl,
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


module.exports.cardsMove = async (req, res) => {
    try {
        const apikey = req.headers.apikey;
        const kanbanizeUrl = req.headers.dom;
        const cardid = req.headers.cardid;
        const column_id = req.body.column_id;

        const formData = JSON.stringify({
            "column_id": column_id
        });

        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/cards/${cardid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json; charset=utf8",
                "apikey": apikey,
                "dom": kanbanizeUrl,
                "cardid": cardid
            },
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            res.json(data);
            console.log(column_id),
            console.log(cardid)
        } else {
            res.json({ "error": response.status });
            console.log(column_id)
        }
    } catch (error) {
        console.error(error);
        console.log(column_id);
        console.log(card_id);
        res.json({ "error": error });
        
    }
};


module.exports.cardsComments = async (req, res) => {
    const apikey = req.body.apikey;
    const kanbanizeUrl = req.body.dom;
    const cardid = req.body.cardid;
    try {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/cards/${cardid}/comments`,
         {
            method: "get",
            headers: {
                "apikey": apikey,
                "cardid": cardid
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
        console.log(cardid);
        res.json({ "error": error });
    }
}

module.exports.cardsCommentsCreate = async (req, res) => {
    //esta ruta crea un comentario en una tarjeta
    const apikey = req.headers.apikey;
    const kanbanizeUrl = req.headers.dom;

    const cardid = req.headers.cardid;
    //const text = req.body.text;
    //const values = {column_id: req.body.c_ID, lane_id: req.body.w_ID, title: req.body.title}
    const text = req.body.text;
    const formData = JSON.stringify({
        "text": text
    });

    try {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/cards/${cardid}/comments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charsetx=utf8",
                "apikey": apikey,
                "domain": kanbanizeUrl,
                "cardid": cardid
            },
            body: formData,
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

//Un comentario para poder hacer commit y usar lo que ya estaba hecho