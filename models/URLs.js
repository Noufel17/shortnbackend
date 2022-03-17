// URL data format in json (for the mongo database)
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// the model of URLs data in mongo db (le model de donnees xD)
const urlSchema =new Schema({
    _id:{
        type:String
    },
    URL:{
        type:String,
        required:true
    },
    hash:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    },
    urlOwner:{
        type:String,
        required:true
    }
});
//now we export the data model (the Schema)
module.exports = URL = mongoose.model('URL',urlSchema);