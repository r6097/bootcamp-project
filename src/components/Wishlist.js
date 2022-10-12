import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import "../css/Wishlist.css";

function Wishlist( props ) {
	const [likedProducts, setLikedProducts] = useState([]);

	useEffect(() => {
		getLikedProducts();
	}, [likedProducts]);

	function sanityCheck() {
		console.log(likedProducts);
	}

	function getLikedProducts() {
		axios.get("http://localhost:5000/products/get-all-products")
			.then(response => {
				const tempLikedProducts = [];
				for (let i = 0; i < response.data.length; i++) {
					if (response.data[i].liked) {
						tempLikedProducts.push(response.data[i]);
					}
				}
				setLikedProducts(tempLikedProducts);
			});
	}

	function removeLikedProduct(id) {
		console.log("removed: " + id);

		axios.put("http://localhost:5000/products/update/" + id, {
			liked: false
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});

		getLikedProducts();
	}
	return (
		<div>
			<Modal show={props.displayModal} onHide={props.close} centered restoreFocus={false}>
				<Modal.Header closeButton>
					<Modal.Title> Items in Wishlist </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{likedProducts.map( product =>
						<Row key={product._id} className="wishlist-product-row">
							<Col> {product.name} </Col>
							<Col md={1}> <AiOutlineClose onClick={() => removeLikedProduct(product._id)} /> </Col>
						</Row>
					)}
					<Row className="wishlist-button-row">
						<Col md={4}>
							<Button onClick={sanityCheck}> Sanity Check </Button>
						</Col>
					</Row>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default Wishlist;