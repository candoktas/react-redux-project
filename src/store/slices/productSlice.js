import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await fetch(
      `https://5fc9346b2af77700165ae514.mockapi.io/products`,
    );
    const data = await response.json();
    return data;
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    allItems: [],
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
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
      const start = (state.currentPage - 1) * 12;
      const end = start + 12;
      state.paginatedItems = state.filteredItems.slice(start, end);
    },
    setBrandFilter: (state, action) => {
      state.filters.brand = action.payload;
      state.filteredItems = filterProducts(state.allItems, state.filters);
      state.totalPages = Math.ceil(state.filteredItems.length / 12);
      state.paginatedItems = state.filteredItems.slice(0, 12);
      state.currentPage = 1;
    },
    setModelFilter: (state, action) => {
      state.filters.model = action.payload;
      state.filteredItems = filterProducts(state.allItems, state.filters);
      state.totalPages = Math.ceil(state.filteredItems.length / 12);
      state.paginatedItems = state.filteredItems.slice(0, 12);
      state.currentPage = 1;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
      state.filteredItems = filterProducts(state.allItems, state.filters);
      state.totalPages = Math.ceil(state.filteredItems.length / 12);
      state.paginatedItems = state.filteredItems.slice(0, 12);
      state.currentPage = 1;
    },
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
      state.filteredItems = filterProducts(state.allItems, state.filters);
      state.totalPages = Math.ceil(state.filteredItems.length / 12);
      state.paginatedItems = state.filteredItems.slice(0, 12);
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allItems = action.payload;
        state.filteredItems = action.payload;
        state.totalPages = Math.ceil(action.payload.length / 12);
        state.paginatedItems = action.payload.slice(0, 12);
        state.status = "succeeded";
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

const filterProducts = (products, filters) => {
  let filtered = [...products];

  if (filters.brand.length > 0) {
    filtered = filtered.filter((product) =>
      filters.brand.includes(product.brand),
    );
  }

  if (filters.model.length > 0) {
    filtered = filtered.filter((product) =>
      filters.model.includes(product.model),
    );
  }

  if (filters.searchQuery) {
    filtered = filtered.filter(
      (product) =>
        product.brand
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(filters.searchQuery.toLowerCase()),
    );
  }

  if (filters.sortBy === "price-low-to-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === "price-high-to-low") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (filters.sortBy === "old-to-new") {
    filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (filters.sortBy === "new-to-old") {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return filtered;
};

export const {
  setPage,
  setBrandFilter,
  setModelFilter,
  setSortBy,
  setSearchQuery,
} = productSlice.actions;
export default productSlice.reducer;
