import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page = 1) => {
    const response = await fetch(
      `https://5fc9346b2af77700165ae514.mockapi.io/products?page=${page}&limit=12`,
    );
    const data = await response.json();
    return { products: data, page };
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filteredItems: [], // Filtrelenmiş ürünleri tutacağız
    status: null,
    currentPage: 1,
    totalPages: 1,
    filters: {
      brand: [],
      model: [],
      sortBy: "",
    },
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setBrandFilter: (state, action) => {
      state.filters.brand = action.payload;
      state.filteredItems = filterProducts(state.items, state.filters);
    },
    setModelFilter: (state, action) => {
      state.filters.model = action.payload;
      state.filteredItems = filterProducts(state.items, state.filters);
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
      state.filteredItems = filterProducts(state.items, state.filters);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload.products;
        state.filteredItems = action.payload.products; // Başlangıçta tüm ürünler listelenir
        state.status = "succeeded";
        state.currentPage = action.payload.page;
        state.totalPages = Math.ceil(100 / 12); // Toplam ürün sayısına göre hesaplanır
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Ürünleri filtreleme ve sıralama fonksiyonu
const filterProducts = (products, filters) => {
  let filtered = [...products];

  // Marka filtreleme
  if (filters.brand.length > 0) {
    filtered = filtered.filter((product) =>
      filters.brand.includes(product.brand),
    );
  }

  // Model filtreleme
  if (filters.model.length > 0) {
    filtered = filtered.filter((product) =>
      filters.model.includes(product.model),
    );
  }

  // Sıralama işlemi
  if (filters.sortBy === "price-low-to-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === "price-high-to-low") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (filters.sortBy === "old-to-new") {
    // `createdAt` alanına göre eskiye göre sıralama
    filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (filters.sortBy === "new-to-old") {
    // `createdAt` alanına göre yeniye göre sıralama
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return filtered;
};

export const { setPage, setBrandFilter, setModelFilter, setSortBy } =
  productSlice.actions;
export default productSlice.reducer;
