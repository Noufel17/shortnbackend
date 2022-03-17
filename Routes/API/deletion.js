const express=require('express');
const router=express.Router();

// import URLs model (as the data from the database)
const URL=require('../../models/URLs');

//Router
// access permission from frontend headersr and origin 
router.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// we get an api call (axios) from front end that has the url name and its hash (_id) 
// we search for it and delete it in database and that's it 
// then i need to make so that the links state updates too everytime i delete an element in data base

router.post('/',(req,res)=>{
    console.log(req.body);
    if(req.body.URL){
        _link=req.body.URL;
        console.log('URL deletion: '+_link);
    }
    if(req.body.hash){
        _hash=req.body.hash;
        console.log('hash deletion: '+_hash);
    }
    if(req.body.username){
        _username=req.body.username;
        console.log('username deletion: '+_username);
    }
    // find it and delete it in database
    URL.findOneAndDelete({_id:_hash,urlOwner:_username},(err,doc)=>{
        if(doc){
            console.log('URL deleted');
            res.send({
                doc:doc,
                status:200,
                statustxt:'deleted'
            })
        }else{
            console.log('not found deletion faild');
            res.send({
                status:300,
                statustxt:'not found'
            })
        }
    })
})

module.exports=router