const express = require('express');
const RESTOBJ = require ('../../database/collection/restaurant');
var REST = RESTOBJ.REST;
var KEYS = RESTOBJ.keys;
const empty = require ('is-empty');
const router = express.Router();
router.get ('/',(req,res)=>{
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
router.put("/", (req,res)=>{
    var datos = rep.boy;
    console.log(datos);

});
module.exports= router; 
