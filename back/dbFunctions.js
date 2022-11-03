const express = require('express');
const db = require("./test")

const app = express();

app.get("/", function(req,res,next) {
    db.query('SELECT * FROM races', (err,data) => {
        if (err) throw err;
        res.status(200).send(data);
    })
});

module.exports = app;