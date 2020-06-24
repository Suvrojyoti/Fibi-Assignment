const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({

    url : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    type : {
        type: String,
        required: true
    }
});

ImageSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.__v;
    return obj;
   };


module.exports = mongoose.model('Image', ImageSchema);
