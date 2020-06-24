const router = require("express").Router()
const image = require('../models/image');


router.post('/upload-images',  async (req, res, next) => {

    try {
        
        if(!req.body.url || !req.body.name || !req.body.type){
            res.status(422).json({
                message: 'insufficient information'
            });
        }
        responseObject = await image.create(req.body);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(responseObject);
    }
    catch (err)
    {
        next(err);
    }

});

router.get('/get-images',  async (req, res, next) => {

    try {

        var limit = parseInt(req.query.limit,10);
        var offset = parseInt(req.query.offset,10);
        
        message_response = await image.find( { name: { $eq:req.query.nameString} } ).skip(offset).limit(limit);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(message_response);
    }
    catch(err)
    {
        next(err);
    }

});

module.exports = router;

