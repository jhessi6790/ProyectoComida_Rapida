const express = require('express');
const MENU = require('../../database/collection/menu');
const empty = require ('is-empty');
const multer = require('multer');
const fs=require('fs');
const path=require('path');
const router = express.Router();
//API MENUS
const storage = multer.diskStorage({
    destination: function (res, file, cb) {
        try {
            fs.statSync('./public/uploads');
        } catch (e) {
            fs.mkdirSync('./public/uploads');
        }
        cb(null, './public/uploads');
    },
    filename: (res, file, cb) => {

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
    //fileFilter: fileFilter,
    /*limits: {
        fileSize: 1024 * 1024 * 5
    }*/
})
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
router.post('/', upload.single("img"), function (req, res, next) {
    let url = req.file.path.substr(6, req.file.path.length);
    const datos = {
        nombre: req.body.nombre,
        foto: url,
        descripcion: req.body.descripcion,
        restaurant: req.body.restaurant,
        precio: req.body.precio,
    };
    var modelMenu = new MENU(datos);
    modelMenu.save()
        .then(result => {
            res.json({
                message: "Menu insertado en la bd",
                id: result._id
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
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
/*
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
