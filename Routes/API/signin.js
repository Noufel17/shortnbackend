const express=require('express');
const router=express.Router();

const accounts=require('../../models/accounts');

//Router
// access permission from frontend headersr and origin 
router.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// how is it gonna work logically:
// the user enters user name and password 
// the user clicks signin 
// we get the username and password from frontend by axios post request 
// we search by both username and password in database
// if not found we send a negative response to front end so we can say to the user that the
// credentials he enterd are wrong
// if found we also send a response back to front end so we can in front end :
// redirect the user to the home page passsing his username as a prop so we can get his 
// links from database and add links using his username to the database
// then i need to medify the homepage fonctionalities to work for a single user at a time 
// finally add a sign out option that redirects to the sign in page

router.post('/',(req,res)=>{
    console.log(req.body); // to make sure we got the request
    if(req.body.username){
        _username=req.body.username;
        console.log('username: '+_username);
    }
    if(req.body.password){
        _password=req.body.password;
        console.log('password: '+_password)
    }
    //search for user data in database
    accounts.findOne({userName:_username,password:_password},(err,doc)=>{
        if(doc){ // if found
            console.log('account found: '+ doc);
            res.send({
                account:doc,
                status:200,
                statustxt:'found'
            })
        }else{
            console.log('account not found');
            res.send({
                status:300,
                statustxt:'not found'
            })
        }
    })
})


module.exports=router