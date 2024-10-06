import React from "react";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import FilterComponent from "../components/FilterComponent";
import CartComponent from "../components/CartComponent";

const Home = () => {
  return (
    <div className="grid bg-white text-[#333333] grid-cols-12 gap-2 p-4">
      {/* Sol panel (Filtreleme alanı) */}
      <div className="col-span-2">
        <FilterComponent />
      </div>

      {/* Orta panel (Ürün listesi) */}
      <div className="col-span-8">
        <ProductList />
        <Pagination />
      </div>

      {/* Sağ panel (Sepet ve Toplam Fiyat) */}
      <div className="col-span-2 py-4">
        <CartComponent />
      </div>
    </div>
  );
};

export default Home;
