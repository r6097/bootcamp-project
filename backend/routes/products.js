const router = require("express").Router();
const Product = require("../models/products.model.js");

router.route("/").get((req, res) => {
	console.log("Request received:", req);
	res.send("Hello World!");
});

router.route("/get-all-products").get((req, res) => {
	Product.find()
		.then(product => res.json(product))
		.catch(err => res.status(400).json("Error: " + err));
});
// CREATE
router.route("/add").post((req, res) => {
	const { name, description, price, image } = req.body;

	const newProduct = new Product({
		name,
		description,
		price,
		image,
		liked: false
	});

	newProduct.save()
		.then(res.send("Product Added!"))
		.catch(err => res.status(400).json("Error: "+ err));
});
// READ
router.route("/get/:id").get((req, res) => {
	Product.findById(req.params.id)
		.then(product => res.json(product))
		.catch(err => res.status(400).json("Error: "+ err));
});
// UPDATE
router.route("/update/:id").put((req, res) => {
	Product.findById(req.params.id)
		.then(product =>{
			product.liked = req.body.liked;

			product.save()
				.then(() => res.status(200).json("Product Updated!"))
				.catch(err => res.status(400).json("Error: "+ err));
		});
});
// DELETE
router.route("/delete/:id").delete((req, res) => {
	Product.findByIdAndDelete(req.params.id)
		.then(item => res.json(item))
		.catch(err => res.status(400).json("Error: "+ err));
});


module.exports = router;