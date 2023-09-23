//where the express server will be running
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "cruddatabase",
});


db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

const corsOptions = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json()); //allows parsing of json request bodies
//app.use(bodyParser.urlencoded({extended:true}));

//req means request (requesting information from frontend), res means response (sending information)
app.post("/api/insert", (req, res) => { 
    const questTitle = req.body.questTitle;
    const questText = req.body.questText;
    /*const sqlInsert = "INSERT INTO quest (questTitle, questObjective, objectiveCount, objectivesCompleted, questText, reward) VALUES (?,?,?,?,?,?);";
    db.query(sqlInsert, [id, questTitle, questObjective, objectiveCount, objectivesCompleted, questText, reward], (err,result) => {
        console.log(request);
    });*/

    const sqlInsert = "INSERT INTO quest (questTitle, questText) VALUES (?,?);";
    db.query(sqlInsert, [questTitle, questText], (err,result) => {
        console.log(result);
    });
    
});

app.get("/api/insert", (req2, res2) =>{
    res2.send("hello");
});


app.get("/", (req3,res3) =>{
    res3.send("/ yee");
});

app.listen(3001, () => {
    console.log("running on port 3001");
});