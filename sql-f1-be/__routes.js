const express = require('express');
const apiRoutes = express.Router();
const { db, pool } = require("./connection");

apiRoutes.get('/', (req,res,next) => {
    res.status(200).send({
        "GET drivers": "returns all drivers in a year"
    });
});

apiRoutes.get('/drivers', (req,res,next) => {
    if (req.query.year === undefined) {
        pool.query(`
        SELECT DISTINCT 
        surname,
        firstName FROM drivers
        ORDER BY surname ASC;   
    `, (err,data) => {
        if (err) throw err;
        res.status(200).send(data);
    })
    } else {
        pool.query(`
            SELECT * FROM drivers
            WHERE year = ${req.query.year}    
        `, (err,data) => {
            if (err) throw err;
            res.status(200).send(data);
        })
    }
});

apiRoutes.get('/driver', (req,res,next) => {
    console.log(req.query)
    pool.query(`
        SELECT * FROM races
        WHERE "${req.query.name}" IN (
            res01, res02, res03, res04, res05,
            res06, res07, res08, res09, res10,
            res11, res12, res13, res14, res15,
            res16, res17, res18, res19, res20,
            res21, res22, res23, res24, res25,
            res26, res27, res28, res29, res30
        );
        `, (err,data) => {
        if (err) throw err;
        res.status(200).send(data);
    })
});

apiRoutes.get('/points', (req,res,next) => {
    pool.query('SELECT * FROM points', (err,data) => {
        if (err) throw err;
        res.status(200).send(data);
    })
});

apiRoutes.get('/races', (req,res,next) => {
    pool.query(`
        SELECT * FROM races
        WHERE seasonYear = ${req.query.year};
    `, (err,data) => {
        if (err) throw err;
        res.status(200).send(data);
    })
});

module.exports = apiRoutes;