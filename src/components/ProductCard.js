import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../css/ProductCard.css'
import { Card, Row, Col } from 'react-bootstrap';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

function ProductCard( productDetails ) {
	const [clicked, setClicked] = useState(productDetails.liked);

	// implement toggle click using setClicked (Refer to Notion Guide Step # 3)
	function toggleClick() {

	}

	// add a useeffect to update product's liked status with axios (Refer to Notion Guide Step # 4)
	useEffect(() => {
		if (productDetails.liked !== clicked) {
			setClicked(productDetails.liked);
		}
	}, [productDetails.liked]);

	return (
		<div className="product-card">
			<Card>
				<Card.Img className="product-img" src={productDetails.img} alt="product image" />
				<Card.Body>
					<Card.Title className="product-name">{productDetails.name} </Card.Title>
					{/* add a row for product details. description (Refer to Notion Guide Step # 5)*/}
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