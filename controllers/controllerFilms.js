const connection = require('../data/db')
function index(req, res) {

    res.json("sono nell index")
}


function show(req, res) {

    res.json("sono nello show")
}





module.exports = { index, show }