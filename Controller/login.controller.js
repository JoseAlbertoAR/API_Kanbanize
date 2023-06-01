const fetch = require('node-fetch');


module.exports.login = async (req, res) => {
    console.log('body: ', req.body);
    const values = {
        email: req.body.email,
        pass: req.body.pass,
        dom: req.body.dom
    };
    const dom = req.body.dom;
    try{
        const response = await fetch(`https://${dom}.kanbanize.com/index.php/api/kanbanize/login//format/json`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
        if (response.ok) {
            const data = await response.json();
            res.json(data);
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

// module.exports./ = async (req, res) => {
//     /*const values = {
//         email: req.body.email, 
//         pass: req.body.pass
//     };*/
//     const values = {
//         email: "matricula@tec.mx",
//         pass: "contraseña"
//     };
//     const response = await fetch(`https://university6y.kanbanize.com/index.php/api/kanbanize/login//format/json`,
//         {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(values)

//         })
//     const data = await response.json();
//     console.log(values);
//     res.json(data);
// }