import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
} from "../store/slices/cartSlice";

const CartComponent = () => {
  const dispatch = useDispatch();
  const { items: cartItems, totalPrice } = useSelector((state) => state.cart);

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity({ id: productId }));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity({ id: productId }));
  };

  if (cartItems.length === 0) {
    return <div className="mt-3">Your cart is empty.</div>;
  }

  return (
    <div className="rounded">
      <div className="shadow-lg px-4 pb-2">
        <h3 className="font-bold mb-4 px-2">Sepetiniz</h3>
        {cartItems.map((item) => (
          <div
            className="p-2 mb-4 flex justify-between items-center"
            key={item.id}
          >
            <div>
              <p>
                {item.brand} {item.model}
              </p>
              {/* Burada fiyat miktar ile çarpılarak gösteriliyor */}
              <p className="text-sm">
                {(item.price * item.quantity).toFixed(2)}₺
              </p>
            </div>
            <div className="flex items-center">
              <button
                className="bg-[#f3f4f6] px-3 py-1"
                onClick={() => handleDecrement(item.id)}
              >
                -
              </button>
              <span className="px-3 py-1 bg-primary text-white">
                {item.quantity}
              </span>
              <button
                className="bg-[#f3f4f6] px-3 py-1"
                onClick={() => handleIncrement(item.id)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="shadow-lg p-4 mt-8">
        <h4 className="text-lg font-bold mb-4">
          Total Price: {totalPrice.toFixed(2)}₺
        </h4>
        <button className="bg-blue-500 text-white py-2 px-4 w-full hover:bg-blue-600">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
