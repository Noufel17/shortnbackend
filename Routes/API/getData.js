const express=require('express');
const router=express.Router();

const URL=require('../../models/URLs');

router.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/:username',(req,res)=>{
    if(req.params.username){
        _username=req.params.username;
        console.log('username: '+_username);
    }
    URL.find({urlOwner:_username},(err,urls)=>{
        if(err){
            console.error(err);
            next();
        }else{
            res.json(urls); 
        }
        
    });   
})
module.exports=router;