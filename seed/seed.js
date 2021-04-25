var {Product} = require('../models/product');
var mongoose = require('mongoose');

const { MongooseDocument } = require('mongoose');
mongoose.connect('mongodb://localhost/shopping-node').
then(_=>{console.log('successful')})
.catch(_=>{
    this.disconnect();
})
var product = [
    new Product({
    imgPath:'../resources/img/CLOTHES/clothes-1.jpg',
    title:'Gaming',
    price:543.33,
    description:'tsheh d'
    }),
    new Product({
        imgPath:'../resources/img/CLOTHES/clothes-1.jpg',
        title:'Gaming',
        price:543.33,
        description:'dfjafdf'
        }),
    new Product({
            imgPath:'../resources/img/CLOTHES/clothes-1.jpg',
            title:'Gaming',
            price:543.33,
            description:'every element'
    }),
    new Product({
                imgPath:'../resources/img/CLOTHES/clothes-1.jpg',
                title:'Gaming',
                price:543.33,
                description:'no one tries this'
    }),

];

for(let c in product){
    product[c].save();
}

function done(){
    mongoose.disconnect();
}