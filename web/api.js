const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const database = require("./database.js");
const port = process.env.PORT || 5000;
const moment = require('moment');
const util = require('util');
const sqlQuery = require("./query.js");


const fn = util.promisify(database.query).bind(database);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/subjects/fetchdata', async function( req , res ){

    let subjectname = req.query.subjectname;

    let linkdatasql = sqlQuery.fetchLinkDataSql(subjectname);
    let notesdatasql = sqlQuery.fetchNotesDataSql(subjectname);

    try{
        let result ={};
        result["linkdata"] = await fn(linkdatasql);
        result["notesdata"] = await fn(notesdatasql);
        res.end(JSON.stringify(result));
    }
    catch(err){
        res.status(500);
        res.end(JSON.stringify(err));
        console.log(err);
    }

});

app.get('/course/fetchdata', async function(req , res){

    let fetchdatasql = sqlQuery.allCoursesFetchDataSql();

    try{
        const result = await fn(fetchdatasql);
        res.end(JSON.stringify(result));
    }
    catch(err){
        res.status(500);
        res.end(JSON.stringify(err));
        console.log(err);
    }

});

app.post('/subjects/savedata', async function (req, res) {

    let comments = req.body.comments;
    let data = req.body.data;
    let type = req.body.type;
    let subjectname = req.body.subject;
    let date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let subjectidsql = sqlQuery.findSubjectIDbySubjectName(subjectname);

    try{
        let result = await fn(subjectidsql);
        let subjectid = result[0].id;
        let valuessql = "'" +subjectid + "','" + data + "','" + comments + "','" + date + "'";
        let insertdatasql = type == "link" ? sqlQuery.saveLinkData(valuessql) : sqlQuery.saveNotesData(valuessql);
        let saveresult = await fn(insertdatasql);
        res.end(JSON.stringify(saveresult));
    }
    catch(err){
        res.status(500);
        res.end(JSON.stringify(err));
        console.log(err);
    }

});

app.listen(port);