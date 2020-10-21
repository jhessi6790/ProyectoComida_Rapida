const express = require('express');
const multer = require('multer');
const fs=require('fs');
const path=require('path');
const RESTOBJ = require ('../../database/collection/restaurante');
var REST = RESTOBJ.REST;
var KEYS = RESTOBJ.keys;
const empty = require ('is-empty');
const { UpgradeRequired } = require('http-errors');
const router = express.Router();
//Fotos
const storage = multer.diskStorage({
    destination: function (res, file, cb) {
        try {
            fs.statSync('./public/uploads');
        } catch (e) {
            fs.mkdirSync('./public/uploads');
        }
        cb(null, './public/uploads');
    },
    filename:(res, file, cb) => {
        cb(null, 'IMG-' + Date.now() + path.extname(file.originalname))
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        return cb(null, true);
    }
    return cb(new Error('Solo se admiten imagenes png y jpg jpeg'));
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})/*.fields[
    { name: 'logo'},
    { name: 'fotolugar'}
  ];*/
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
//POST CON LA FOTO
let dobleinput= upload.fields([{name:'logo',maxCount:2},{name:'fotolugar', maxCount:5}])
router.post('/', dobleinput, function(req, res,next){
    //upload.fields(req, res, (error) => {
        if(error){
          return res.status(500).json({
            detalle: error,
            "error" : error.message,
          });
        }else{
          if (req.fields == undefined) {
                return res.status(400).json({
                "error" : 'No se recibio las imagenes'        
                });
            }
            console.log(req.fields);
            let url = req.fields.path.substr(6, req.fields.path.length);
            console.log(url);
            const datos = {
                name: req.body.name,
                nit: req.body.nit,
                propietario:req.body.propietario,
                street:req.body.street,
                telephone:req.body.telephone,
                Logo:url,
                fotolugar:url,
            };
var modelRestaurante = new REST(datos);
            modelRestaurante.save()
                .then(result => {
                    res.json({
                        message: "Restaurante insertado en la bd",
                        id: result._id
                    })
                }).catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
                
                }
    });
//POST
/*router.post ('/',async(req,res)=>{
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
});*/
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
