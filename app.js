const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql')


app.use(morgan('combined'))

app.get('/Item/:No',(req,res)=> {
console.log("fetching" +req.params.No)

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '123456shoruq',
    database:'m'

})
const itemNo = req.params.No
const queryString1 = "SELECT * FROM table1 WHERE No = ?"
connection.query(queryString1,[itemNo], (err, rows, fields) => {
    if (err){
        console.log("failed to query for items" +err)
        res.sendStatus(500)
        res.end()
        return 

    }
    console.log("fetched items succesfully ")
    const item = rows.map((row)=> {
        return { No: row.No,
                item: row.item,
                type: row.type,
                division: row.division,
                CAD_SME: row.CAD_SME,
                Status: row.Status}
    })
    res.json(item)
})
//res.end()
})

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


