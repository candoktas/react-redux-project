import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../store/slices/cartSlice.js";
import CartComponent from "../components/CartComponent";

const ProductDetail = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.allItems.find((product) => product.id === id),
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <div className="w-full mt-4 px-8">
        <button
          className="py-2 hover:bg-blue-200 flex items-center"
          onClick={() => navigate("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Return to Home
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start em px-8 py-2 gap-6">
        <div className="flex flex-col md:flex-row h-auto w-auto md:h-1/2 md:w-4/5 border-blue-600 shadow-md p-4 md:justify-between">
          <img
            src={product.image}
            alt={product.name}
            className="md:w-1/2 h-auto object-cover rounded"
          />
          <div className="md:ml-8 mt-4 md:mt-0 flex flex-col justify-between md:w-1/2 h-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-normal">
                {product.brand} {product.model}
              </h2>
              <p className="text-2xl text-primary font-medium">
                {product.price}₺
              </p>
            </div>
            <div>
              <button
                className="bg-primary text-xl font-bold text-white py-2 px-4 w-full hover:bg-blue-600 my-3"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
              <p className="text-lg font-normal">{product.description}</p>
            </div>
          </div>
        </div>

        <div className="md:w-1/5 w-full">
          <CartComponent />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
