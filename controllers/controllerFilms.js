const connection = require('../data/db')


function index(req, res) {
    const sql = 'SELECT * FROM `db-films`.movies'
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' })
        res.json(results)
    })

}


function show(req, res) {






    res.json("sono nello show")
}





module.exports = { index, show }