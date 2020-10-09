const express = require('express');
const sha1=require('sha1');
const RESTOBJ = require ('../../database/collection/restaurant');
const USER = require('../../database/collection/user');
const MENU = require('../../database/collection/menu');
var REST = RESTOBJ.REST;
var KEYS = RESTOBJ.keys;
const empty = require ('is-empty');
const { json } = require('body-parser');
const { update } = require('../../database/collection/user');
const router = express.Router();
//API RESTAURANT
router.get ('/restaurant',(req,res)=>{
    var params = req.query;
    var SKIP = 0;
    var LIMIT = 10;
    var order = 1;
    var filter = {};
    if(params.skip){
        SKIP = parseInt(params.skip);
    }
    if(params.limit){
        LIMIT = parseInt(params.limit);
    }
    if(params.order){
        order = parseInt(params.order);
        console.log(order);
    }
    if(params.name){
        filter["name"]= params.name;
    }
    if(params.id){
        filter["_id"]= params.id;
    }
    if(params.nit){
        filter["nit"]= params.nit;
    }
    if(params.search){
        var regularexpresion = new RegExp(params.search, "g");
        console.log(regularexpresion);
        filter["name"]=regularexpresion;
    }
    REST.find(filter).skip(SKIP).limit(LIMIT).sort({name:order}).exec((err,docs)=>{
        if(err){
            res.status(200).json({
                "msn":"Error en la base de datos"
        });
        return;
        }
        res.status(200).json(docs);
    });     
    }); 
router.post ('/restaurant',async(req,res)=>{
    console.log(req.body);
    var params = req.body;
     params["registerdate"]= new Date();
    let ins = new REST(req.body);
    let result= await ins.save();
    if(!empty(result)){
        res.json({menssage: 'restaurante creado en la bd'});
    }else{
        res.json({menssage:'error'});
    }
});
router.delete('/restaurant', (req, res, next) => {
    var params = req.query;
    if(params.id == null){
        res.status(300).json({
            "msn": "Error no existe id"
        });
        return;
    }
    REST.remove({_id: params.id}, (err, docs)=> {
        if (err){    
            res.status(300).json({
            "msn": "No se logro eliminar el registro"
        });
        return;
        }
        res.status(300).json(docs);
     }); 
}); 
router.patch('/restaurant', (req, res, next) => {
    var params = req.query;
    var data = req.body;
    if(params.id == null){
        res.status(300).json({
            "msn": "Error no existe id"
        });
        return;
    }
    var objkeys = Object.keys(data);
    for (var i = 0; i < objkeys.length; i++) {
        if(!checkkeys(objkeys[i])){
            res.status(300).json({
                "msn": "Tus parametros son incorrectos " + objkeys[i]
            });
            return;
        };
    }
    REST.update({_id: params.id}, data).exec((err, docs)=> {
        res.status(300).json(docs);
    });
});
function checkkeys (key) {
        for (var j = 0; j < KEYS.length; j++) {
            if( key == KEYS[j]){
                return true;
        }
    }
    return false;
}
router.put("/restaurant", async(req,res)=>{
    var params = req.query;
    var bodydata = req.body;
    if(params.id == null){
        res.status(300).json({msn:"Id necesatio"});
        return;
    }
    var allowkeylist = ['name',"street","telephone","fotolugar"];
    var keys = Object.keys(bodydata);
    var updateobjectdata={};
    for(var i=0; i<keys.length;i++){
            if (allowkeylist.indexOf(keys[i]) > -1){
                updateobjectdata[keys[i]] = bodydata[keys[i]];
        }
    }
    REST.update({_id: params.id},{$set:  updateobjectdata},(err,docs)=>{
        if(err){
            res.status(500).json({msn:"Existen problemas con la base de datos"});
            return;
        }
        res.status(200).json(docs);
    } );

});
//API USER
router.post("/user", async(req, res) => {
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
          res.status(200).json(msn);
          return;
      }
      res.status(200).json(docs);
      return;
    })
  });
router.get('/user',(req,res)=>{
      USER.find({},(err,docs)=>{
          if(!empty(docs)){
              res.json(docs);
          }else{
              res.json({menssage:'no existe en la base de datos'});
          }
      });
  });
router.patch("/user", (req, res) => {
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
router.delete("/user", async(req, res) => {
    if (req.query.id == null) {
    res.status(300).json({
    msn: "Error no existe id"
    });return;
    }
    var r = await USER.remove({_id: req.query.id});
    res.status(300).json(r);
    });
//API MENUS
router.get('/menu', function (req, res, next) {
    MENU
        .find()
        .exec()
        .then(docs => {
            if (docs.length == 0) {
                res.json({
                    message: "No se encontro en la base de datos"
                })
            } else {
                res.json(docs);
            }
        }).catch(err => {
            res.json({
                error: err
            });
        })

});
router.post('/menu', async(req,res)=>{
    console.log(req.body);
    let ins=new MENU(req.body);
    let result=await ins.save();
    if(!empty(result)){
        res.json({message:'menu insertado en la bd'});

    }else{
        res.json({message:'error'});
    }

} );
router.patch("/menu", (req, res) => {
    if (req.query.id == null) {
        res.status(300).json({
             msn: "Error no existe id"
        });
        return;
    }
    var id = req.query.id;
    var params = req.body;
    MENU.findOneAndUpdate({_id: id}, params, (err, docs) => {
    res.status(200).json(docs);
    });
});
router.delete("/menu", async(req, res) => {
    if (req.query.id == null) {
        res.status(300).json({
            msn: "Error no existe id"
        });
        return;
    }
    var r = await MENU.remove({_id: req.query.id});
    res.status(300).json(r);
});


module.exports= router; 
