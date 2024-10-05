import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import {
  setBrandFilter,
  setModelFilter,
  setSortBy,
  fetchAllProducts,
} from "../store/slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { allItems: products, filters } = useSelector(
    (state) => state.products,
  ); // Tüm ürünler ve filtreler burada
  const [brands, setBrands] = useState([]); // Markaları tutmak için state
  const [models, setModels] = useState([]); // Modelleri tutmak için state

  // İlk açılışta tüm ürünleri fetch et
  useEffect(() => {
    dispatch(fetchAllProducts()); // Tüm ürünleri yükle
  }, [dispatch]);

  // Markalar ve modelleri belirlemek için useEffect kullanıyoruz
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

    const updatedBrands = checked
      ? [...filters.brand, brand] // Eğer checkbox seçiliyse, markayı ekle
      : filters.brand.filter((b) => b !== brand); // Eğer checkbox kaldırıldıysa, markayı çıkar

    dispatch(setBrandFilter(updatedBrands)); // Yeni filtreyi güncelle
  };

  // Model filtreleme fonksiyonu
  const handleModelChange = (e) => {
    const model = e.target.value;
    const checked = e.target.checked;

    const updatedModels = checked
      ? [...filters.model, model] // Eğer checkbox seçiliyse, modeli ekle
      : filters.model.filter((m) => m !== model); // Eğer checkbox kaldırıldıysa, modeli çıkar

    dispatch(setModelFilter(updatedModels)); // Yeni filtreyi güncelle
  };

  // Sıralama seçeneği değiştiğinde çağrılır
  const handleSortChange = (sortOption) => {
    dispatch(setSortBy(sortOption));
  };

  return (
    <div className="grid bg-white text-[#333333] grid-cols-12 gap-4 p-4">
      {/* Sol panel (Filtreleme alanı) */}
      <div className="col-span-3 p-4 rounded">
        <h3 className="font-bold mb-4">Sort By</h3>
        <ul>
          <li>
            <input
              type="radio"
              name="sort"
              checked={filters.sortBy === "old-to-new"}
              onChange={() => handleSortChange("old-to-new")}
            />{" "}
            Old to New
          </li>
          <li>
            <input
              type="radio"
              name="sort"
              checked={filters.sortBy === "new-to-old"}
              onChange={() => handleSortChange("new-to-old")}
            />{" "}
            New to Old
          </li>
          <li>
            <input
              type="radio"
              name="sort"
              checked={filters.sortBy === "price-high-to-low"}
              onChange={() => handleSortChange("price-high-to-low")}
            />{" "}
            Price High to Low
          </li>
          <li>
            <input
              type="radio"
              name="sort"
              checked={filters.sortBy === "price-low-to-high"}
              onChange={() => handleSortChange("price-low-to-high")}
            />{" "}
            Price Low to High
          </li>
        </ul>

        {/* Dinamik Marka Listesi */}
        <h3 className="font-bold my-4">Brands</h3>
        <ul>
          {brands.map((brand) => (
            <li key={brand}>
              <input
                type="checkbox"
                value={brand}
                checked={filters.brand.includes(brand)} // Marka seçiliyse işaretle
                onChange={handleBrandChange}
              />{" "}
              {brand}
            </li>
          ))}
        </ul>

        {/* Dinamik Model Listesi */}
        <h3 className="font-bold my-4">Model</h3>
        <ul>
          {models.map((model) => (
            <li key={model}>
              <input
                type="checkbox"
                value={model}
                checked={filters.model.includes(model)} // Model seçiliyse işaretle
                onChange={handleModelChange}
              />{" "}
              {model}
            </li>
          ))}
        </ul>
      </div>

      {/* Orta panel (Ürün listesi) */}
      <div className="col-span-6">
        <ProductList /> {/* Ürün listeleme bileşeni */}
        <Pagination /> {/* Pagination bileşeni */}
      </div>

      {/* Sağ panel (Sepet ve Toplam Fiyat) */}
      <div className="col-span-3 p-4 rounded">
        <h3 className="font-bold mb-4">Sepetiniz</h3>
        <div className="border p-2 mb-4">
          <p>Samsung s22</p>
          <div className="flex items-center">
            <button>-</button>
            <span className="mx-2">2</span>
            <button>+</button>
          </div>
          <p>12.000₺</p>
        </div>
        <div className="border p-2 mb-4">
          <p>Lenovo PC</p>
          <div className="flex items-center">
            <button>-</button>
            <span className="mx-2">1</span>
            <button>+</button>
          </div>
          <p>18.000₺</p>
        </div>
        <div className="border p-2 mb-4">
          <p>iPhone 12</p>
          <div className="flex items-center">
            <button>-</button>
            <span className="mx-2">5</span>
            <button>+</button>
          </div>
          <p>15.000₺</p>
        </div>
        <h4 className="text-lg font-bold mb-4">Total Price: 117.000₺</h4>
        <button className="bg-blue-500 text-white py-2 px-4 w-full hover:bg-blue-600">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Home;
