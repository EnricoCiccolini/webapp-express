const connection = require('../data/db')
const nameFilms = require('../seed/nameImageFilms')


function index(req, res) {
    const paramsResarc = []
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
        sql += ` WHERE title like ? or director like ? or abstract like ?`
        paramsResarc.push(`%${resarc}`, `%${resarc}`, `%${resarc}`)
    }

    sql += ` GROUP BY movies.ID`
    connection.query(sql, paramsResarc, (err, results) => {
        if (err) return res.status(500).json({ error: err })
        res.json(results.map(result => ({
            ...result,
            imagepath: process.env.DB_PATH + result.image
        })))
    })

}

function show(req, res) {

    const { id } = req.params;

    const filmsSql = `
    SELECT
    movies.*, ROUND(AVG(reviews.vote), 2) AS review_vote
    FROM
    movies
        LEFT JOIN
    reviews ON movies.id = reviews.movie_id
    WHERE
    movies.id = ?
    `;

    const rewiuwsSql = `
    SELECT reviews.*
    FROM reviews
    WHERE movie_id = ?
    `;

    connection.query(filmsSql, [id], (err, filmsResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (filmsResults.length === 0) return res.status(404).json({ error: 'movie  not found' });
        const film = filmsResults[0];

        connection.query(rewiuwsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });
            film.tags = reviewsResults;
            res.json({
                ...film,
                imagepath: process.env.DB_PATH + film.image
            });
        });
    });
}

function patch(req, res) {

    nameFilms(req, res, connection)



}




module.exports = { index, show, patch }