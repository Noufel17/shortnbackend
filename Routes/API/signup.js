const express=require('express');
const router=express.Router();
const uniqid=require('uniqid');

const accounts=require('../../models/accounts');

//Router
// access permission from frontend headersr and origin 
router.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// how it works logically :
// the user enters name and password 
// the user clicks sign up
// we get the name and password from front end by axios post request
// we give the user an id
// we save the user in data base 
// still to do : we redirect the user to sign in page so he can sign in to his account


//check if the request is here by postman
router.post('/',(req,res)=> {
    // to confirm that we got the request we print it on the console
    console.log('body: '+req.body);
    if(req.body.username){
        _username=req.body.username;
        console.log('username: '+_username);
    }
    if(req.body.password){
        _password=req.body.password;
        console.log('password: '+_password);
    }
    id=uniqid();
    accounts.findOne({userName:_username},(err,doc)=>{
        if(doc){
            console.log(doc);
            console.log('invalid username username already exists');
            res.send({
                doc:doc,
                status:300,
                statustxt:'invalid'
            })
        }else{
            console.log('valid username');
            const account= new accounts({
                userName:_username,
                password:_password,
                _id:id
            })
            account.save(err=>{
                if(err){
                    console.error(err);
                }
                console.log('account added to db')
                res.send({
                    account:account,
                    status:200,
                    statustxt:'saved'
                });
            })
        }
    })
});
module.exports=router