const router = require("express").Router()
const image = require('../models/image');
const fetch = require('node-fetch');
const fileType = require('file-type');



router.post('/upload-images',  async (req, res, next) => {

    try {
        
        if(!req.body.url || !req.body.name || !req.body.type){
            res.status(422).json({
                message: 'Insufficient information'
            });
        }

        if(req.body.type.toLowerCase()!="image" && req.body.type.toLowerCase()!="png" )
        {
            res.status(422).json({
                message: 'Invalid image type, must be image/png'
            });
        }
        const response = await fetch(req.body.url);
        if(response.status === 404)
        {
            throw ("Invalid URL, unable to fetch");
        }

        const buffer = await response.buffer();
        let size = Buffer.byteLength(buffer);
        let type = await fileType.fromBuffer(buffer);

        var finalObject = { 
            "url": req.body.url,
            "name": req.body.name,
            "type": req.body.type,
            "metaData": {
                "size": size,
                "extType": type.ext
            }
            
        };


        responseObject = await image.create(finalObject);
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

        var limit = parseInt(req.query.limit,10)||10;
        var offset = parseInt(req.query.offset,10)||0;

        if(!('nameString' in req.query)){
            // return res.status(422).json({
            //     message: 'insufficient information'
            // });
            message_response = await image.find().skip(offset).limit(limit);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(message_response);
            return;
        }
        
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

