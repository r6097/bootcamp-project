// remove all except '/' and add link to video 
const router = require('express').Router();
let Product = require('../models/products.model.js');

router.route('/').get((req, res) => {
    console.log("Request received:", req);
    res.send('Hello World!');
}); 

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price; 
    const image = req.body.image; 

    const newProduct = new Product({
        name,
        description,
        price, 
        image
    });

    newProduct.save()
        .then(() => res.json('New Product Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/get/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(product=>res.json(product))
        .catch(err=>res.status(400).json('Error: ' + err));
}); 

router.route("/get-all-products").get((req, res) => {
    Product.find()
        .then(product => res.json(product))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/update/:id').put((req, res) => {
    Product.findById(req.params.id)
    .then(product => {
       product.liked = req.body.liked;
       product.save()
       .then(() => res.status(200).json("Product Updated!")) 
       .catch(err => res.status(400).json("Error: " + err)); 
    }); 
});

router.route('/delete/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

module.exports = router; 