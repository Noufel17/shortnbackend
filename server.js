const express = require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');


// import URL data model 
const URL=require('./models/URLs');

// initializing express
const app=express();

// bodyParser to get data from data base into the app in json format
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//database key
const db=require('./config/keys').mongoURL;

// create connection to the database
mongoose.connect(db)
    .then(()=> console.log('mongoDB connected sucessfully'))
    .catch((err)=> console.log(err));


// Routes
const shorten=require('./Routes/API/shorten');
app.use('/API/shorten',shorten);

const redirect=require('./Routes/API/redirect');
app.use('/API/redirect',redirect);

const getData=require('./Routes/API/getData');
app.use('/API/getData',getData);

const signup=require('./Routes/API/signup');
app.use('/API/signup',signup);

const signin=require('./Routes/API/signin');
app.use('/API/signin',signin);

const deletion=require('./Routes/API/deletion');
app.use('/API/deletion',deletion);



// redirection function after getting the shortened URL
app.get('/:hash',(req,res)=>{
    const id=req.params.hash;
    // we search it in database
    URL.findOne({_id:id},(err,doc)=>{
        if(doc){
            res.redirect(doc.URL);
        }else{
            res.status(400).json({error:'this URL is not correct'});
        }
    })
});

//initializing server port 
const port=process.env.PORT || 5000;
app.listen(port, ()=> console.log(`server is running on port : ${port}`));
