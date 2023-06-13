

module.exports.boards = async (req, res) => {
    const apikey = req.body.apikey;
    const kanbanizeUrl = req.body.dom;



    try {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/boards?is_archived=0&if_assigned=1&fields=board_id,workspace_id,name&expand=workflows`, {
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

module.exports.workflows = async (req, res) => {
    const apikey = req.body.apikey;
    const kanbanizeUrl = req.body.dom;
    // const b_ID = 21;
    const bID = req.body.bID; //board_id

    try {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/boards/${bID}/workflows`, {
            method: "get",
            headers: {
                "apikey": apikey,
                "domain": kanbanizeUrl,
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
    console.log("Board ID: ", bID);
}

module.exports.columns =  async (req, res) => {
    const apikey = req.body.apikey;
    const kanbanizeUrl = req.body.dom;
    // const b_ID = 21; //req.params.b_ID; //board_id
    const bID = req.body.bID; //board_id


    try {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/boards/${bID}/columns?fields=column_id,workflow_id,parent_column_id,name`, {
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

module.exports.lane =  async (req, res) => {
    const apikey = req.body.apikey;
    const kanbanizeUrl = req.body.dom;
    // const b_ID = 21; //req.params.b_ID; //board_id
    const bID = req.body.bID; //board_id


    try {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/boards/${bID}/currentStructure
        `, {
            method: "get",
            headers: {
                "apikey": apikey,
                "domain": kanbanizeUrl,
            },

        })
        if (response.ok) {
            const data = await response.json();
            res.json(data);
            console.log("Boards structure: ", data);
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