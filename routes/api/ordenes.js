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
router.post('/', async(req,res)=>{
    console.log(req.body);
    let ins = Orden(req,body);
    let ressult = await ins.save();
    res.json(ressult);
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
    Orden.findOneAndUpdate({_id: id}, params, (err, docs) => {
    res.status(200).json(docs);
    });
});
router.delete("/", async(req, res) => {
    if (req.query.id == null) {
        res.status(300).json({
        msn: "Error no existe id"
    });}
    else{
        var r = await Orden.remove({_id: req.query.id});
        res.json(r);
    }
});


module.exports = router;