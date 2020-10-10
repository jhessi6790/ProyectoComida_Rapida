var express = require('express');
var router = express.Router();
const Orden = require('../../database/collection/orden');
//GET
router.get('/', function (req, res, next) {
    Orden.find().exec().then(docs => {
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
//POST

module.exports = router;