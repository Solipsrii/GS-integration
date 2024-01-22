// REQUIRE & GLOBAL
const http = require('http');
const path = require ('path');
const express = require('express');
const exp = express();
const ejs = require('ejs')
const { google } = require('googleapis');
const sheetID = "1BMZZL8ErFDQ4ZjfBHTYjfbUOVx4n1wwkfApit8-Mkqw"

//express ini
exp.use(express.json());
exp.use(express.static(path.join(__dirname, 'pages'))); //express will NOT load the .css without this. Kill me. Treats it as html/text.
exp.listen(8090, () => {
    console.log('listening on 8090')})
//
//ejs ini
exp.set('view engine', 'ejs');
    //set .ejs home folder as /pages
exp.set('views', path.join(process.cwd(), '/pages/'))

//

//define authentication function:
//authentication is required for the SHEETS object, so when a GET request is being made to the SHEET object, it has the proper identification on it prior.

//server code, on GET requests

exp.get('/', async (req, res) => {
    console.log('access attempted')

    //server code
        try{
            
            response = await getValues(sheetID)     
            //getting: [ [link], [https://...], [https://...] ]
            //so we want to dump the item "link".
            
            imageArray = response.data.values.slice(1)
            
            //render index.ejs page, and "inject" the array 'im'.
            res.render("index.ejs", imageArray);
            console.log('page generated')
        }
        catch(err){
            console.log(err);
            res.render(err);
        }
});

//on-listen:

//
//AUTHENTICATION:
//create an auth key (with on-folder file, and define the 'scope' (utility-type of the req) to deal with spreadsheets)
//acquire authentication to use the spreadsheet with getClient
//then acquire the entire retrieved sheet.

const authentication = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'bot_credentials.json',
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();

    const sheet = google.sheets({
        version: 'v4', 
        auth: client
    });

   
    return {sheet};

}

//GETVALUES
    //spreadsheetID -- the sheet's ID, exists in the page's URL.
    //range -- the sheet's range, like in excel lingo: uses: Spreadheet!A1:Z, 
    //as an example, where "Spreadhseet" is the name of the given sheet, and A1:Z means: From column A, row 1, include everything until row Z. (i.e: everything)

//get authentication for the 'sheet', and return the given data retrieved (columns, column, etc)

async function getValues(spreadsheetId, range){
    const {sheet} = await authentication();

    //fetch the sheet DB according to its ID
    const response = await sheet.spreadsheets.values.get({
        spreadsheetId: sheetID,
        range: ['Sheet1!B1:B']
    })

    return response;
    //console.log("RES: "+JSON.stringify(response.data));

}