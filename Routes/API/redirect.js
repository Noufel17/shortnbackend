const express=require('express');
const router=express.Router();

const URL=require('../../models/URLs');

//Router
// GET test REQUEST route to API/redirect/test testing
router.get('/test',(req,res)=> res.json({msg:'in API'}));

// GET REQUEST to request or fetch url by id as hash
router.get('/',(req,res)=> {
    const hash=req.headers.hash;
    URL.findOne({_id:hash})
        .then((doc)=> {
            return res.json({url:doc.URL});
        })
        .catch((err)=>{
            return res.status(400).json({error:'this URL has expired'})
        })
});

module.exports = router;