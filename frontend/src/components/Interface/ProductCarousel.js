import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { listTopProducts } from "../../actions/productActions";

import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import AlertMessage from "./AlertMessage";

const ProductCarousel = () => {
	const dispatch = useDispatch();

	const { products, loading, error } = useSelector((state) => {
		return state.productTop;
	});

	useEffect(() => {
		dispatch(listTopProducts());
	}, [dispatch]);

	return (
		<div className="my-3">
			{loading ? (
				<Loader />
			) : error ? (
				<AlertMessage variant="error">{error}</AlertMessage>
			) : (
				<Carousel pause="hover" className="bg-dark">
					{products.map((prod) => (
						<Carousel.Item key={prod._id}>
							<Link to={`/products/${prod._id}`}>
								<Image src={prod.image} alt={prod.name} fluid />
								<Carousel.Caption className="carousel-caption">
									<h3>
										{prod.name} (${prod.price})
									</h3>
								</Carousel.Caption>
							</Link>
						</Carousel.Item>
					))}
				</Carousel>
			)}
		</div>
	);
};

export default ProductCarousel;
