const express = require('express');
const sha1=require('sha1');
const USER = require('../../database/collection/user');
const empty = require ('is-empty');
const router = express.Router();
const jwt=require('jsonwebtoken');
//API USER
router.post('/', async(req, res) => {
    var client = req.body;
    req.body.password= sha1 (req.body.password);
    client["registerdate"] = new Date();
    var cli = new USER(client);
    cli.save((err, docs)=> {
      if(err){
          var errors = err.errors;
          var keys = Object.keys(errors);
          var msn = {};
          for(var i=0;i< keys.length;i++){
              msn[keys[i]]=errors[keys[i]].message;
          }
          res.status(200).json({message:'usuario insertado en la bd'}); 
          return;
      }
      res.status(200).json(docs);
      return;
    })
  });/*
router.get('/',(req,res)=>{
      USER.find({},(err,docs)=>{
          if(!empty(docs)){
              res.json(docs);
          }else{
              res.json({menssage:'no existe en la base de datos'});
          }
      });
  });
router.patch("/", (req, res) => {
    if (req.query.id == null) {
        res.status(300).json({
             msn: "Error no existe id"
        });
        return;
    }
    var id = req.query.id;
    var params = req.body;
    USER.findOneAndUpdate({_id: id}, params, (err, docs) => {
    res.status(200).json(docs);
    });
});
router.delete("/", async(req, res) => {
    if (req.query.id == null) {
        res.status(300).json({
        msn: "Error no existe id"
    });
    return;
}
var r = await USER.remove({_id: req.query.id});
res.status(300).json(r);
});
router.post("/login",(req,res)=>{
USER.findOne({email:req.body.email},(err,doc)=>{
    if(!empty(doc)){
        if(sha1(req.body.password)==doc.password){
            let token=jwt.sign({
                id:doc._id,
                email:doc.email
            },process.env.JWT_Key||'miClave',{
                expiresIn:"1h"
            });
            res.json({
                message:'Bienvenido',
                idUser:doc._id,
                name:doc.name,
                admin:doc.admin, 
                token:token
            });
            }else{
                res.json({message:'password incorrecto'});
            }

        }else{
            res.json({message:'el email es incorrecto'});
        }
    });
});
/*router.get('/token',(req,res)=>{
    const token = jwt.sign({
        
    },process.env.JWT_Key||'miClave',{
        expiresIn:"1h"
    });
    res.json({
        token:token
    })

});*/
module.exports= router; 
