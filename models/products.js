const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id : {
        type: String
    },
    title: {
        type: String,
        text: true
    },
    status:{
        type: String,
        default:"active"
    }
},{
    timestamps : true
})

const Product = mongoose.model('category', productSchema);
module.exports = Product;