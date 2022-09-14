import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Container, Row, Button} from 'react-bootstrap';
import ProductCard from './ProductCard';
import Navbar from './Navbar';
import '../css/Home.css';

function Home() {

	const [products, setProducts] = useState([]);

	// remove 
    useEffect(() => {
        axios
            .get('http://localhost:5000/products/get-all-products')
            .then(response => {
				setProducts(response.data);
			});
    }, [products]);

	// remove 
	function sanityCheck() {
		console.log(products);
	}

	return (
		<div className="home">
			<Navbar />
			<Container className="container-box">
				<Row>
					{/* JSX version of a for loop, this will iterate through all 
					the products and create a product card for each */}
					{products.map( product => (
						<ProductCard 
							// React maps require keys for every item in a list
							// We've kept the product ID as a default key for indexing
							// while we continue to parse through the products and pass 
							// all required parameters to the ProductCard component
							key = {product._id} 
							id = {product._id}
							img={product.image} 
							name={product.name} 
							description={product.description} 
							price={product.price/100}
							liked={product.liked} />
					))}
				</Row>
				<Button onClick={sanityCheck}>Sanity Check</Button>
			</Container>
		</div>
	);
}

export default Home;