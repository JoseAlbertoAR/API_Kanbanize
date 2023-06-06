

//Controlador para el endpoint que permite obtener la informacion de workspaces y su contenido
module.exports.workspaces = async (req, res) => {
    const apikey = req.body.apikey;
    const kanbanizeUrl = req.body.dom;

    try {
        const response = await fetch(`https://${kanbanizeUrl}.kanbanize.com/api/v2/workspaces?if_assigned_to_boards=1&is_archived=0`, {
            method: "get",
            headers: {
                "apikey": apikey,
                "domain": kanbanizeUrl,
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
}
