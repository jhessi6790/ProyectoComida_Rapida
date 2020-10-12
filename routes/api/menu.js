const express = require('express');
const MENU = require('../../database/collection/menu');
const empty = require ('is-empty');
const router = express.Router();
//API MENUS
router.get('/', function (req, res, next) {
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
router.post('/', async(req,res)=>{
    console.log(req.body);
    let ins=new MENU(req.body);
    let result=await ins.save();
    if(!empty(result)){
        res.json({message:'menu insertado en la bd'});

    }else{
        res.json({message:'error'});
    }

} );
router.patch("/", (req, res) => {
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
router.delete('/', async(req, res) => {
    if (req.query.id == null) {
        res.status(300).json({
            msn: "Error no existe id"
        });
        return;
    }
    var r = await MENU.remove({_id: req.query.id});
    res.status(300).json(r);
});
//foto
/*const multer = require('multer');
const fs=require('fs');
const path=require('path');
const { path } = require('../../app');
const storage=multer.diskStorage({
    destination:()=>{
        try{
            fs=statSync('./public/uploads');
        }catch(e){
            console.log(e);
            fs.mkdirSync('./public/uploads/');
        }
        cb(null, './public/uploads/');

    },
    filename:(res, file,cb)=>{
        cb(null, 'IMG'+Date.now()+path.extname(file.originalname));
    }
});
const upload = multer({dest: 'uploads/'});
router.post('/fotomenu', upload.array('img', 12), (req,res)=>{
    let imgSet=[];
    if(!empty(req.files)){
        req.files.forEach(dat=>{
            imgSet.push({
            });
        });
    }
    res.json({message:'esto esta funcionando'});
})*/
/*var storage = multer.diskStorage({
    destination: "./public/restaurants",
    filename: function (req, file, cb) {
      console.log("-------------------------");
      console.log(file);
      cb(null, "IMG_" + Date.now() + ".jpg");
    }
  });
  var storage_menu = multer.diskStorage({
    destination: "./public/menu",
    filename: function (req, file, cb) {
      console.log("-------------------------");
      console.log(file);
      cb(null, "MENU_" + Date.now() + ".jpg");
    }
  });
  var upload = multer({
    storage: storage
  }).single("img");
  var upload_menu = multer({
    storage: storage_menu
  }).single("img");*/
module.exports= router; 
