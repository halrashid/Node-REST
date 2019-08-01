const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql')


app.use(morgan('combined'))

app.get('/Items/:Page/:Type',(req,res)=> {
    console.log("fetching" +req.params.Page)
    
    const connection = mysql.createConnection({
        host: 'localhost',
        user:'root',
        password: '123456shoruq',
        database:'m'
    
    })
    const page = req.params.Page
    const itemType = req.params.Type
    const queryString1 = "SELECT * FROM tableDetails WHERE Type = ?"
    connection.query(queryString1,[itemType], (err, rows, fields) => {
        if (err){
            console.log("failed to query for items" +err)
            res.sendStatus(500)
            res.end()
            return 
    
        }
        console.log("fetched items succesfully ")
        const item = rows.map((row)=> {
            return { No: row.No,
                Item: row.Item,
                Description: row.Description,
                Impact_Reamars_Comments: row.Impact_Reamars_Comments,
                Type: row.Type,
                Division: row.Division,
                Proponent: row.Proponent,
                is_Proponent_involve: row.is_Proponent_involve,
                Fund_Source: row.Fund_Source,
                CAD_SME: row.CAD_SME,
                Theme: row.Theme,
                start: row.start,
                end: row.end,
                cost: row.cost,
                NPV: row.NPV,
                NPV_Justification: row.NPV_Justification,
                DT_Item: row.DT_Item,
                BP_Item: row.BP_Item,
                Demand: row.Demand,
                Note: row.Note,
                Status: row.Status,
                Update: row.Update
            }
        })
        res.json(item)
    })
})

app.get("/", (req, res)=>{
    res.send("Hello he is a groot! ")
})

app.get("/users", (req, res) => {
    var user1 = {FN: "Hassan"}
    res.json(user1)
})

app.listen(3003, () => {
    console.log("Server is running")
})