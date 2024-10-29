const express = require("express");
const morgan = require("morgan");
const pg = require("pg");
const cors = require("cors");
const bodyparser = require("body-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const db  =new pg.Client({
    host: "localhost",
    port:5432,
    database:"abcd",
    user:"postgres",
    password:"dhoni777"
});

db.connect().then(()=>{
    console.log("Database Connected!");
});

const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Hello World!");
})

app.post("/add",async (req,res)=>{
    const data=req.body;
    await db.query(`INSERT INTO finance_tracker(description,mode,amount) values($1,$2,$3)`, [data.description,data.mode,data.amount]);
    res.status(201).send("Record inserted sucessfully!");
})

app.listen(3000,()=>{
    console.log("Server started at PORT 3000");
})