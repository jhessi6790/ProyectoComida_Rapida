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
/*router.patch("/", (req, res) => {
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
});*/
router.patch('/', function (req, res, next) {
    let idMenu = req.params.id;
    const datos = {};
    Object.keys(req.body).forEach((key) => {
        datos[key] = req.body[key];
    });
    console.log(datos);
    MENU.findByIdAndUpdate(idMenu, datos).exec()
        .then(result => {
            res.json({
                message: "Datos actualizados"
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            })
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
