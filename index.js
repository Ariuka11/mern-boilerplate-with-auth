const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv')

const server = express()
const port = process.env.PORT || 5000

dotenv.config()
server.use(express.json())

server.get(`/`, (req, res) => {
    res.send("Welcome to my API")
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong"
    })
})

const uri = process.env.ATLAS_URI || "mongodb://localhost:27017"
mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology: true})
mongoose.connection.once("open", () => {
    console.log("MongoDB database connection established successfully")
})

server.listen(port, () => {
    console.log(`Server is listening on ${port}...`)
})