const express=require('express');
const router=express.Router();
const uniqid=require('uniqid');

// import URLs model (as the data from the database)
const URL=require('../../models/URLs');

//Router
// access permission from frontend headersr and origin 
router.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// GET REQUEST route to API/shorten/test testing
router.get('/test',(req,res)=> res.json({msg:'in API'}));

// POST REQUEST  route to API/shorten/

router.post('/',(req,res)=> {
    // to confirm that we got the request we print it on the console
    console.log('body: '+req.body);
    if(req.body.url){
        urlData=req.body.url;
        _username=req.body.username;
        // here we have to get the username from front end too to save it with URL
        console.log('urldata: '+urlData);
        console.log('username: '+_username);
    }
    // check if the url sent in the request (simulates the URLs submitted in front end) exists in the database
    // we have to filter also by urlOwner
    URL.findOne({URL : urlData, urlOwner:_username},(err,doc)=>{ 
        if(doc){ // if url already exists in data base we dont all another one
            console.log(doc);
            console.log('URL already exists in DB')
            res.send({
                doc:doc,
                status: 300,
            })
        }else{ // we add it to the data base(largly thinking i need to add an attribute urlOwner  so we can add it if they belong to diffrent owners)
            console.log('this is a new URL');
            const uniqHash= uniqid();
            const link = new URL({
                _id: uniqHash,
                hash:uniqHash,
                URL:urlData,
                urlOwner:_username
            });
            link.save((err)=>{
                if(err){
                    return console.error(err);
                }
                console.log('URL added te db')
                res.send({
                    doc:link,
                    status: 200,
                    statusTxt: 'ok'
                })
            });
        }
    });
});

// export router
module.exports=router;