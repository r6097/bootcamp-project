import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../css/ProductCard.css'
import { Card, Row, Col } from 'react-bootstrap';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

function ProductCard( productDetails ) {
	// remove 
	const [clicked, setClicked] = useState(productDetails.liked);

	
	function toggleClick() {
		// remove 
		setClicked(!clicked);
	}

	// remove
	useEffect(() => {
		if (clicked !== productDetails.liked) {
			axios.put("http://localhost:5000/products/update/" + productDetails.id, {
				liked: clicked
			})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
		}
    }, [clicked]);

	useEffect(() => {
		if (productDetails.liked !== clicked) {
			setClicked(productDetails.liked);
		}
	}, [productDetails.liked]);

	return (
		// remove some {productDetails...}
		<div className="product-card">
			<Card>
				<Card.Img className="product-img" src={productDetails.img} alt="product image" />
				<Card.Body>
					<Card.Title className="product-name">{productDetails.name} </Card.Title>
					<Row className="product-desc">
						{productDetails.description} 
					</Row>
					<Row className="product-price">
						${productDetails.price} 
					</Row>
					<Row className="wishlist-row">
						<Col md={6} className="wishlist-col">
							Add to Wishlist
						</Col>
						<Col md={1} className="wishlist-col">
							{ productDetails.liked ?
								<FcLike onClick={toggleClick} className="wishlist-svg"/>
								:
								<FcLikePlaceholder onClick={toggleClick} className="wishlist-svg"/>
							}
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</div>
	);
}

export default ProductCard;