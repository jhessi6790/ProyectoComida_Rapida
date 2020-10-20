const express = require('express');
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
})
const MENU = require('../../database/collection/menu');
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
        name: req.body.name,
        precio:req.body.precio,
        description: req.body.description,
        picture: url,
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
module.exports= router; 
