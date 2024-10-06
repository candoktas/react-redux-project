import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";
import Loading from "./Loading.jsx";

const ProductList = () => {
  const dispatch = useDispatch();
  const { paginatedItems: products, status } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <div>Error fetching products</div>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="block p-4 rounded shadow-md hover:shadow-xl transition-all duration-200"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <p className="text-primary text-sm font-medium mb-2">
              {product.price}₺
            </p>
            <h3 className="text-sm font-bold">{product.brand}</h3>
            <p className="text-sm font-medium"> {product.model}</p>
            <button
              className="bg-primary text-base font-normal text-white py-2 px-4 mt-2 w-full hover:bg-blue-600"
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(product);
              }}
            >
              Add to Cart
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
