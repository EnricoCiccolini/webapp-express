const connection = require('../data/db')


function index(req, res) {
    const sql = 'SELECT * FROM `db-films`.movies'
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' })
        res.json(results)
    })

}


function show(req, res) {

    const { id } = req.params;

    const filmsSql = 'SELECT * FROM `db-films`.movies WHERE id = ?';

    const rewiuwsSql = `
    SELECT *
    FROM reviews
    JOIN movies ON movies.id = reviews.movie_id
    WHERE movies.id = 1
    `;



    connection.query(filmsSql, [id], (err, filmsResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (filmsResults.length === 0) return res.status(404).json({ error: 'movie  not found' });
        const film = filmsResults[0];
        connection.query(rewiuwsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });
            film.tags = reviewsResults;
            res.json(film);
        });
    });
}





module.exports = { index, show }