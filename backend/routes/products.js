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

module.exports = router;