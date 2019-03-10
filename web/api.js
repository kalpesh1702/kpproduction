const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const database = require("./database.js");
const sqlQuery = require("./query.js");
const email = new (require("./email.js"));

const port = process.env.PORT || 5000;
const moment = require('moment');
const util = require('util');
const fs = require('fs');
const Promiseconvert = require('bluebird');
const Twig = require('twig');
const pdf = require('html-pdf');

Promiseconvert.promisifyAll(Twig);
Promiseconvert.promisifyAll(pdf);
Promiseconvert.promisifyAll(fs);

const fn = util.promisify(database.query).bind(database);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

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

    let comments = cleanmessage(req.body.comments);
    let data = cleanmessage(req.body.data);
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

app.get('/shareemail', async function(req, res){

    let subjectname = req.query.subjectname;
    let emailid = req.query.emailid;

    try{
        let linkData = sqlQuery.fetchLinkDataSql(subjectname);
        let notesData = sqlQuery.fetchNotesDataSql(subjectname);

        let result ={};
        let linkdataresult  =  fn(linkData);
        let notesdataresult =  fn(notesData);

        result["linkdata"]  = await linkdataresult;
        result["notesdata"] =  await notesdataresult;

        let currentTime = moment(new Date()).format("YYYYMMDDHHmmss");
        let destinationpath = "./" + currentTime + "_subjectdata.pdf";
        let options = { format: 'Letter' , filename: destinationpath};

        let generatehtmlfile  = await Twig.renderFileAsync('./subjectdata.html.twig',{
            'linkdata' : result["linkdata"],
            'notesdata' : result["notesdata"]
        });

        let generatepdf = await pdf.createAsync(generatehtmlfile, options);
        let mailOptions = await email.mailOptions;

        mailOptions.to = emailid;
        mailOptions.attachments = [
            {
                filename: 'subjectdata.pdf',
                path: __dirname + "/" + currentTime + "_subjectdata.pdf"
            },
        ]

        let sendmail = await email.sendemail();
        let removefile = await fs.unlinkAsync(destinationpath);
        res.status(200);
        res.send("Email sent Succesfully");

    }
    catch(err){
        console.log(err);
        res.status(500);
        res.send(JSON.stringify(err));
    }

});

app.get('/downloadfile', async function(req,res){

    let subjectname = req.query.subjectname;

    try{
        let linkData = sqlQuery.fetchLinkDataSql(subjectname);
        let notesData = sqlQuery.fetchNotesDataSql(subjectname);

        let result ={};
        let linkdataresult  =  fn(linkData);
        let notesdataresult =  fn(notesData);

        result["linkdata"]  = await linkdataresult;
        result["notesdata"] =  await notesdataresult;

        let currentTime = moment(new Date()).format("YYYYMMDDHHmmss");
        let destinationpath = "./" + currentTime + "_subjectdata.pdf";
        let options = { format: 'Letter' , filename: destinationpath};

        let generatehtmlfile  = await Twig.renderFileAsync('./subjectdata.html.twig',{
            'linkdata' : result["linkdata"],
            'notesdata' : result["notesdata"]
        });

        let generatepdf = await pdf.createAsync(generatehtmlfile, options);

        filedata = await fs.readFileAsync(__dirname + "/" + currentTime + "_subjectdata.pdf");

        res.status(200);
        res.contentType("application/octet-stream");
        res.setHeader( "Content-Disposition", "attachment; filename=subject.pdf" );
        res.send(filedata);

        let removefile = await fs.unlinkAsync(destinationpath);

    }
    catch(err){
        console.log(err);
        res.status(500);
        res.send(JSON.stringify(err));
    }

});

let  cleanmessage = (msg) => {
    return msg.replace(/'/g, '"');   // remove single quote.
}


console.log("server learning on port - " + port);
app.listen(port);