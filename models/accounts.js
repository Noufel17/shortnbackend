const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const account= new Schema({
    _id :{
        type: String
    },
    userName:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
module.exports= accounts = mongoose.model('accounts',account);