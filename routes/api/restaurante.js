const express = require('express');
const RESTOBJ = require ('../../database/collection/restaurante');
var REST = RESTOBJ.REST;
var KEYS = RESTOBJ.keys;
const empty = require ('is-empty');
const router = express.Router();
//API RESTAURANT
router.get('/',(req,res)=>{
    REST.find({},(err,docs)=>{
        if(!empty(docs)){
            res.json(docs);
        }else{
            res.json({menssage:'no existe en la base de datos'});
        }
    });
});
router.post ('/',async(req,res)=>{
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
router.delete('/', (req, res, next) => {
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
router.patch('/', (req, res, next) => {
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
router.put("/", async(req,res)=>{
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
module.exports= router; 
