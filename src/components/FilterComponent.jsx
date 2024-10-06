import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBrandFilter,
  setModelFilter,
  setSortBy,
} from "../store/slices/productSlice";

const FilterComponent = () => {
  const dispatch = useDispatch();
  const { allItems: products } = useSelector((state) => state.products);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]); // Çoklu seçim için marka state
  const [selectedModels, setSelectedModels] = useState([]); // Çoklu seçim için model state
  const [selectedSort, setSelectedSort] = useState("");
  const [brandSearch, setBrandSearch] = useState(""); // Brand search için state
  const [modelSearch, setModelSearch] = useState(""); // Model search için state

  // Unique brand ve model listeleri oluşturma
  useEffect(() => {
    if (products.length > 0) {
      const uniqueBrands = [
        ...new Set(products.map((product) => product.brand)),
      ];
      const uniqueModels = [
        ...new Set(products.map((product) => product.model)),
      ];
      setBrands(uniqueBrands);
      setModels(uniqueModels);
    }
  }, [products]);

  // Marka filtreleme fonksiyonu
  const handleBrandChange = (e) => {
    const brand = e.target.value;
    const checked = e.target.checked;

    let updatedSelectedBrands = [...selectedBrands];

    if (checked) {
      // Marka seçiliyse ekle
      updatedSelectedBrands.push(brand);
    } else {
      // Marka seçili değilse çıkar
      updatedSelectedBrands = updatedSelectedBrands.filter((b) => b !== brand);
    }

    setSelectedBrands(updatedSelectedBrands); // State'i güncelle
    dispatch(setBrandFilter(updatedSelectedBrands)); // Filtreyi gönder
  };

  // Model filtreleme fonksiyonu
  const handleModelChange = (e) => {
    const model = e.target.value;
    const checked = e.target.checked;

    let updatedSelectedModels = [...selectedModels];

    if (checked) {
      // Model seçiliyse ekle
      updatedSelectedModels.push(model);
    } else {
      // Model seçili değilse çıkar
      updatedSelectedModels = updatedSelectedModels.filter((m) => m !== model);
    }

    setSelectedModels(updatedSelectedModels); // State'i güncelle
    dispatch(setModelFilter(updatedSelectedModels)); // Filtreyi gönder
  };

  // Sıralama seçeneği değiştirme
  const handleSortChange = (sortOption) => {
    if (selectedSort === sortOption) {
      setSelectedSort("");
      dispatch(setSortBy(""));
    } else {
      setSelectedSort(sortOption);
      dispatch(setSortBy(sortOption));
    }
  };

  // Brand'leri arama kutusuna göre filtreleme
  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase()),
  );

  // Model'leri arama kutusuna göre filtreleme
  const filteredModels = models.filter((model) =>
    model.toLowerCase().includes(modelSearch.toLowerCase()),
  );

  return (
    <div className="p-4 rounded">
      <h3 className="font-bold mb-4">Sort By</h3>
      <ul className="mb-6">
        <li>
          <input
            type="radio"
            name="sort"
            checked={selectedSort === "old-to-new"}
            onChange={() => handleSortChange("old-to-new")}
          />{" "}
          Old to New
        </li>
        <li>
          <input
            type="radio"
            name="sort"
            checked={selectedSort === "new-to-old"}
            onChange={() => handleSortChange("new-to-old")}
          />{" "}
          New to Old
        </li>
        <li>
          <input
            type="radio"
            name="sort"
            checked={selectedSort === "price-high-to-low"}
            onChange={() => handleSortChange("price-high-to-low")}
          />{" "}
          Price High to Low
        </li>
        <li>
          <input
            type="radio"
            name="sort"
            checked={selectedSort === "price-low-to-high"}
            onChange={() => handleSortChange("price-low-to-high")}
          />{" "}
          Price Low to High
        </li>
      </ul>

      <h3 className="font-bold my-4">Brands</h3>
      <div className="border p-2 rounded-md">
        {/* Sabit kalan Search input */}
        <input
          type="text"
          placeholder="Search Brands"
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)} // Arama kutusuna yazılanları güncelle
          className="w-full p-2 mb-2 border rounded text-gray-600"
        />
        {/* Yalnızca liste için scroll */}
        <ul className="max-h-24 overflow-y-auto">
          {filteredBrands.map((brand) => (
            <li key={brand}>
              <input
                type="checkbox"
                value={brand}
                checked={selectedBrands.includes(brand)} // Seçili olup olmadığını kontrol et
                onChange={handleBrandChange}
              />{" "}
              {brand}
            </li>
          ))}
        </ul>
      </div>

      <h3 className="font-bold my-4">Model</h3>
      <div className="border p-2 rounded-md">
        {/* Sabit kalan Search input */}
        <input
          type="text"
          placeholder="Search Models"
          value={modelSearch}
          onChange={(e) => setModelSearch(e.target.value)} // Arama kutusuna yazılanları güncelle
          className="w-full p-2 mb-2 border rounded text-gray-600"
        />
        {/* Yalnızca liste için scroll */}
        <ul className="max-h-24 overflow-y-auto">
          {filteredModels.map((model) => (
            <li key={model}>
              <input
                type="checkbox"
                value={model}
                checked={selectedModels.includes(model)} // Seçili olup olmadığını kontrol et
                onChange={handleModelChange}
              />{" "}
              {model}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterComponent;
