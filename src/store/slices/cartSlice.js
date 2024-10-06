import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      // Toplam fiyatı güncelle
      state.totalPrice += parseFloat(action.payload.price);
    },
    removeFromCart: (state, action) => {
      const productToRemove = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (productToRemove) {
        // Toplam fiyatı ürün fiyatı kadar azalt
        state.totalPrice -=
          parseFloat(productToRemove.price) * productToRemove.quantity;

        // Ürünü sepetten çıkar
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
      }
    },
    incrementQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity++;
        // Toplam fiyatı güncelle
        state.totalPrice += parseFloat(product.price);
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product) {
        if (product.quantity > 1) {
          product.quantity--;
          // Toplam fiyatı güncelle
          state.totalPrice -= parseFloat(product.price);
        } else {
          // Miktar 1 ise, ürünü tamamen kaldır
          state.totalPrice -= parseFloat(product.price);
          state.items = state.items.filter((item) => item.id !== product.id);
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
