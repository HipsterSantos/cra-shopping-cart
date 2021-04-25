var mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    imgPath: {type:String,required:true},
    title: {type:String,required:true},
    description: {type:String,required:true},
    price: {type: Number,require:true}
});
const  Product = mongoose.model('Product',Schema);
module.exports = {
    Product
}