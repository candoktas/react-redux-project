import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../store/slices/cartSlice.js";
import CartComponent from "../components/CartComponent"; // Sepet bileşenini dahil ediyoruz

const ProductDetail = () => {
  const { id } = useParams();
  const product = useSelector(
    (state) => state.products.allItems.find((product) => product.id === id), // allItems'tan ürünü bul
  );
  const dispatch = useDispatch();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-between p-8 gap-6">
      {/* Sol kısım: Ürün detayları */}
      <div className="flex flex-col md:flex-row h-1/2 w-4/5 border-blue-600 shadow-md p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-1/2 h-auto object-cover rounded"
        />
        <div className="ml-8 mt-4 md:mt-0 flex flex-col justify-between w-1/2 h-auto">
          <div>
            <h2 className="text-3xl font-bold">
              {product.brand} {product.model}
            </h2>
            <p className="text-xl text-blue-600 font-semibold">
              {product.price}₺
            </p>
          </div>
          <div>
            <button
              className="bg-blue-500 text-white py-2 px-4 w-full hover:bg-blue-600 mb-3"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
            <p className="">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Sağ kısım: Sepet bileşeni */}
      <div className="md:w-1/5">
        <CartComponent /> {/* Sepet bileşenini sağda gösteriyoruz */}
      </div>
    </div>
  );
};

export default ProductDetail;
