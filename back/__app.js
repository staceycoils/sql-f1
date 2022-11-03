const express = require('express');
const cors = require('cors')
const router = express.Router();
const db = require("./test");
const apiRoutes = require('./__routes')

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.use("/*", (req,res,next) => {
    res.status(404).send({ msg: "Path not found!" })
});

module.exports = app;