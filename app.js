const express = require('express');
const app = express();
const morgan = require('morgan');



app.use(morgan('combined'))

app.get("/", (req, res)=>{
    console.log("It works!")
    res.send("Hello he is a root! ")
})

app.get("/users", (req, res) => {
    var user1 = {FN: "Hassan"}
    res.json(user1)
})

app.listen(3003, () => {
    console.log("Server is running")
})


