import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const {
    filteredItems: products,
    status,
    currentPage,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(currentPage)); // Ürünleri mevcut sayfaya göre çek
  }, [dispatch, currentPage]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
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
            className="block border p-4 rounded shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-bold">{product.brand}</h3>
            <p className="text-lg font-semibold"> {product.model}</p>
            <p className="text-blue-600 text-xl font-semibold">
              {product.price}₺
            </p>
            <button
              className="bg-blue-500 text-white py-2 px-4 mt-2 w-full hover:bg-blue-600"
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
