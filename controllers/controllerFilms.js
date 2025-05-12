const connection = require('../data/db')
const nameFilms = require('../seed/nameImageFilms')


function index(req, res) {

    const { resarc } = req.query
    console.log(resarc)
    let sql = `
   SELECT 
    movies.*, round(AVG(reviews.vote), 2) AS review_vote
FROM
    movies
        LEFT JOIN
    reviews ON movies.id = reviews.movie_id
    `
    if (resarc) {
        sql += ` WHERE title like "%${resarc}%" or director like "%${resarc}%" or abstract like "%${resarc}%"`
    }

    sql += ` GROUP BY movies.ID`
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err })
        res.json(results.map(result => ({
            ...result,
            imagepath: process.env.DB_PATH + result.image
        })))
    })

}


function show(req, res) {

    const { id } = req.params;

    const filmsSql = 'SELECT * FROM `db-films`.movies WHERE id = ?';

    const rewiuwsSql = `
    SELECT reviews.*
    FROM reviews
    JOIN movies ON movies.id = reviews.movie_id
    WHERE movies.id = ?
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

function patch(req, res) {

    nameFilms(req, res, connection)



}




module.exports = { index, show, patch }