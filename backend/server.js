import express from "express";

const app = express();


//routes

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Buhat</h1>")
})

app.listen(8080, () => {
    console.log("Node Server is Running")
})