const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(morgan('short'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function getConnection(){
    return  mysql.createConnection({
            host: 'localhost',
            user:'root',
            password: '123456shoruq',
            database:'m'
        });
}

app.get('/Items/:Page/:Type',(req,res)=> {
    console.log("fetching" +req.params.Page)
    
    const connection = getConnection();

    const page = req.params.Page;
    const itemType = req.params.Type;
    const queryString1 = "SELECT * FROM tableDetails WHERE Type = ?";
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
    });
});

app.post("/Item", (req, res) => {
    const connection = getConnection();
    const bodyJson = req.body;

    const columns = "("
        + "Item, "
        + "Description, "
        + "Type, "
        + "Impact_Reamars_Comments, "
        + "Division, "
        + "Proponent, "
        + "is_Proponent_involve, "
        + "Fund_Source, "
        + "CAD_SME, "
        + "Theme, "
        + "start, "
        + "end, "
        + "cost, "
        + "NPV, "
        + "NPV_Justification, "
        + "DT_Item, "
        + "BP_Item, "
        + "Demand, "
        + "Note, "
        + "Status, "
        + "Last_Update"
        + ")";

    const values = [
        bodyJson.Item,
        bodyJson.Description,
        bodyJson.Type,
        bodyJson.Impact_Reamars_Comments,
        bodyJson.Division,
        bodyJson.Proponent,
        bodyJson.is_Proponent_involve,
        bodyJson.Fund_Source,
        bodyJson.CAD_SME,
        bodyJson.Theme,
        bodyJson.start,
        bodyJson.end,
        bodyJson.cost,
        bodyJson.NPV,
        bodyJson.NPV_Justification,
        bodyJson.DT_Item,
        bodyJson.BP_Item,
        bodyJson.Demand,
        bodyJson.Note,
        bodyJson.Status,
        bodyJson.Last_Update
    ];
    const questions = "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const insertQuery = " INSERT INTO tableDetails " + columns +" VALUES " + questions;
    connection.query(insertQuery, values, (err, rows, fields) => {
        if (err){
            console.log("failed to query for insert item" + err);
            res.sendStatus(500);
            res.end();
            return;
        }
        bodyJson.No = rows.insertId;
        res.json(bodyJson);
    })
});

app.delete("/Item/:No" , (req,res)=> {
    console.log("deleting item", req.params.No);
    const connection = getConnection();
    const deleteQuery = "DELETE FROM tableDetails WHERE No = ?";
    connection.query(deleteQuery, [req.params.No], (err, rows, fields) => {
        if (err){
            console.log("failed to query for delete item" + err);
            res.sendStatus(500);
            res.end();
            return;
        }
        res.json(req.params.No);
    });
})

app.get("/", (req, res)=>{
    res.send("Hello he is a groot! ")
});

app.listen(3003, () => {
    console.log("Server is running")
});