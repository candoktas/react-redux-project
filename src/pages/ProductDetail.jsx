import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../store/slices/cartSlice.js";

const ProductDetail = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.items.find((product) => product.id === id),
  );
  const dispatch = useDispatch();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-1/2 h-auto object-cover rounded"
        />
        <div className="ml-8 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold mb-4">
            {product.brand} {product.model}
          </h2>
          <p className="text-xl text-blue-600 font-semibold mb-4">
            {product.price}₺
          </p>
          <p className="mb-4">{product.description}</p>
          <button
            className="bg-blue-500 text-white py-2 px-4 w-full hover:bg-blue-600"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
