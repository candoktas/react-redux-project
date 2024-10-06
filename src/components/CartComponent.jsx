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
        <h3 className="font-bold text-sm mb-4 px-2 pt-2">Your Cart</h3>
        {cartItems.map((item) => (
          <div
            className="p-2 mb-4 flex justify-between items-center flex-wrap"
            key={item.id}
          >
            <div className="w-1/2">
              <div>
                <p className="text-xs">{item.brand}</p>
                <span className="text-xs">{item.model}</span>
              </div>
              {/* Burada fiyat miktar ile çarpılarak gösteriliyor */}
              <p className="text-xs">
                {(item.price * item.quantity).toFixed(2)}₺
              </p>
            </div>
            <div className="flex items-center w-1/2">
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
      <div className="shadow-lg p-4 mt-5">
        <h4 className="text-sm font-normal mb-4" data-testid="total-price">
          Total Price:{" "}
          <span className="text-primary font-bold">
            {totalPrice.toFixed(2)}₺
          </span>
        </h4>

        <button className="bg-primary text-white py-2 px-4 w-full hover:bg-blue-600">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
