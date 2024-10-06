import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    return serializedState
      ? JSON.parse(serializedState)
      : { items: [], totalPrice: 0 };
  } catch (e) {
    console.warn("Could not load cart from localStorage", e);
    return { items: [], totalPrice: 0 };
  }
};

const saveCartToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.warn("Could not save cart to localStorage", e);
  }
};

const initialState = loadCartFromLocalStorage();

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

      state.totalPrice += parseFloat(action.payload.price);
      saveCartToLocalStorage(state);
    },
    incrementQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity++;
        state.totalPrice += parseFloat(product.price);
        saveCartToLocalStorage(state);
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product) {
        if (product.quantity > 1) {
          product.quantity--;
          state.totalPrice -= parseFloat(product.price);
        } else {
          state.totalPrice -= parseFloat(product.price);
          state.items = state.items.filter((item) => item.id !== product.id);
        }
        saveCartToLocalStorage(state);
      }
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
