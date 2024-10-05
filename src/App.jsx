import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Ana sayfa bileşeni
import ProductDetail from "./pages/ProductDetail.jsx";
import Navbar from "./components/Navbar.jsx"; // Ürün detay bileşeni

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Ana sayfa rotası */}
          <Route path="/" element={<Home />} />

          {/* Ürün detay sayfası */}
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
