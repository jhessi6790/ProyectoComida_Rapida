const REST = require ('../database/collection/restaurant');
const express = require('express');
const empty = require ('is-empty');
const router = express.Router();
router.get ('/',(req,res)=>{
    REST.find({},(err,docs)=>{
        if(!empty(docs)){
            res.json(docs); 
        }else{
            res.json({menssage:'no existen en la bd'});
        }
    });
});
/*router.post ('/',(req,res)=>{
    console.log(req.body);
    let ins = new REST(req.body);
    let result= await ins.save();
    if(!empty(result)){
        res.json({menssage: 'restaurante cread en la bd'});
    }else{
        res.json({menssage:'error'});
    }
});*/

module.exports= router; 
