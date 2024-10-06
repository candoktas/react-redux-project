import { setBrandFilter, setModelFilter } from "../store/slices/productSlice";
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../store/slices/productSlice";

// Mock verilerle store'u manuel oluşturuyoruz
const mockStore = configureStore({
  reducer: {
    products: productReducer,
  },
  preloadedState: {
    products: {
      allItems: [
        { id: 1, brand: "Toyota", model: "Camry", price: 10000 },
        { id: 2, brand: "Ford", model: "Mustang", price: 20000 },
        { id: 3, brand: "BMW", model: "X5", price: 30000 },
      ],
      filteredItems: [],
      paginatedItems: [],
      status: null,
      currentPage: 1,
      totalPages: 1,
      filters: {
        brand: [],
        model: [],
        sortBy: "",
        searchQuery: "",
      },
    },
  },
});

describe("Product Slice Tests", () => {
  test("should update the brand filter", () => {
    const initialState = mockStore.getState().products;
    const brandsToFilter = ["Toyota", "Ford"];

    mockStore.dispatch(setBrandFilter(brandsToFilter));
    const updatedState = mockStore.getState().products;

    expect(updatedState.filters.brand).toEqual(brandsToFilter);
    expect(updatedState).not.toEqual(initialState); // State güncellenmiş olmalı
  });

  test("should update the model filter", () => {
    const initialState = mockStore.getState().products;
    const modelsToFilter = ["Camry", "Mustang"];

    mockStore.dispatch(setModelFilter(modelsToFilter));
    const updatedState = mockStore.getState().products;

    expect(updatedState.filters.model).toEqual(modelsToFilter);
    expect(updatedState).not.toEqual(initialState); // State güncellenmiş olmalı
  });
});
