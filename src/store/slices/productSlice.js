import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Tüm ürünleri fetch eden thunk
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await fetch(
      `https://5fc9346b2af77700165ae514.mockapi.io/products`,
    );
    const data = await response.json();
    return data; // Tüm ürünler
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    allItems: [], // Tüm ürünler (filtreleme için)
    filteredItems: [], // Filtrelenmiş ürünler
    paginatedItems: [], // Pagination ile gösterilecek ürünler
    status: null,
    currentPage: 1,
    totalPages: 1,
    filters: {
      brand: [],
      model: [],
      sortBy: "",
      searchQuery: "", // Arama için kullanılan filtre
    },
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
      // Sayfa numarası değiştiğinde, pagination işlemi yapılır
      const start = (state.currentPage - 1) * 12;
      const end = start + 12;
      state.paginatedItems = state.filteredItems.slice(start, end);
    },
    setBrandFilter: (state, action) => {
      state.filters.brand = action.payload;
      state.filteredItems = filterProducts(state.allItems, state.filters);
      state.totalPages = Math.ceil(state.filteredItems.length / 12); // Filtrelenmiş ürünler için sayfa sayısını güncelle
      state.paginatedItems = state.filteredItems.slice(0, 12); // İlk 12 ürünü göster
      state.currentPage = 1; // Sayfa numarasını 1 yap
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
        state.allItems = action.payload; // Tüm ürünler allItems'a kaydediliyor
        state.filteredItems = action.payload; // Başlangıçta filtreleme olmadan tüm ürünler gösterilecek
        state.totalPages = Math.ceil(action.payload.length / 12); // Toplam sayfa sayısını hesapla
        state.paginatedItems = action.payload.slice(0, 12); // İlk sayfa için 12 ürünü göster
        state.status = "succeeded";
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Filtreleme ve sıralama işlemi
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

  // Arama sorgusuna göre filtreleme
  if (filters.searchQuery) {
    filtered = filtered.filter(
      (product) =>
        product.brand
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(filters.searchQuery.toLowerCase()),
    );
  }

  // Sıralama işlemi
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
