import React from "react";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import FilterComponent from "../components/FilterComponent";
import CartComponent from "../components/CartComponent";

const Home = () => {
  return (
    <div className="md:grid bg-white text-[#333333] grid-cols-12 gap-2 p-4 flex flex-col">
      {/* Sol panel (Filtreleme alanı) */}
      <div className="order-2 md:col-span-2 md:order-none">
        <FilterComponent />
      </div>

      {/* Orta panel (Ürün listesi) */}
      <div className="order-3 md:col-span-8 md:order-none">
        <ProductList />
        <Pagination />
      </div>

      {/* Sağ panel (Sepet ve Toplam Fiyat) */}
      <div className="order-1 md:col-span-2 md:order-none py-4">
        <CartComponent />
      </div>
    </div>
  );
};

export default Home;
