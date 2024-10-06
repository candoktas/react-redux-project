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
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");

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

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    const checked = e.target.checked;

    let updatedSelectedBrands = [...selectedBrands];

    if (checked) {
      updatedSelectedBrands.push(brand);
    } else {
      updatedSelectedBrands = updatedSelectedBrands.filter((b) => b !== brand);
    }

    setSelectedBrands(updatedSelectedBrands);
    dispatch(setBrandFilter(updatedSelectedBrands));
  };

  const handleModelChange = (e) => {
    const model = e.target.value;
    const checked = e.target.checked;

    let updatedSelectedModels = [...selectedModels];

    if (checked) {
      updatedSelectedModels.push(model);
    } else {
      updatedSelectedModels = updatedSelectedModels.filter((m) => m !== model);
    }

    setSelectedModels(updatedSelectedModels);
    dispatch(setModelFilter(updatedSelectedModels));
  };

  const handleSortChange = (sortOption) => {
    if (selectedSort === sortOption) {
      setSelectedSort("");
      dispatch(setSortBy(""));
    } else {
      setSelectedSort(sortOption);
      dispatch(setSortBy(sortOption));
    }
  };

  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase()),
  );

  const filteredModels = models.filter((model) =>
    model.toLowerCase().includes(modelSearch.toLowerCase()),
  );

  return (
    <div className="p-4 rounded">
      <div className="shadow-lg p-2 mb-8">
        <h3 className="font-bold mb-4">Sort By</h3>
        <ul className="mb-3">
          <li className="flex items-center text-sm mb-2">
            <input
              type="radio"
              name="sort"
              checked={selectedSort === "old-to-new"}
              onChange={() => handleSortChange("old-to-new")}
              className="w-4 h-4 mr-2"
            />{" "}
            Old to New
          </li>
          <li className="flex items-center text-sm mb-2">
            <input
              type="radio"
              name="sort"
              checked={selectedSort === "new-to-old"}
              onChange={() => handleSortChange("new-to-old")}
              className="mr-2 w-4 h-4"
            />{" "}
            New to Old
          </li>
          <li className="flex items-center text-sm mb-2">
            <input
              type="radio"
              name="sort"
              checked={selectedSort === "price-high-to-low"}
              onChange={() => handleSortChange("price-high-to-low")}
              className="mr-2 w-4 h-4"
            />{" "}
            Price High to Low
          </li>
          <li className="flex items-center text-sm">
            <input
              type="radio"
              name="sort"
              checked={selectedSort === "price-low-to-high"}
              onChange={() => handleSortChange("price-low-to-high")}
              className="mr-2 w-4 h-4"
            />{" "}
            Price Low to High
          </li>
        </ul>
      </div>

      <div className="shadow-lg p-2 mb-8">
        <h3 className="font-bold">Brands</h3>
        <div className="rounded-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Brands"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full bg-[#fafafb] p-2 mb-2 pl-10 rounded text-gray-600"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="absolute left-2 top-[21px] transform -translate-y-1/2 w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <ul className="max-h-24 overflow-y-auto">
            {filteredBrands.map((brand) => (
              <li key={brand} className="flex items-center text-sm mb-1">
                <input
                  type="checkbox"
                  value={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={handleBrandChange}
                  className="mr-1 w-4 h-4"
                />{" "}
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shadow-lg p-2">
        <h3 className="font-bold">Model</h3>
        <div className="rounded-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Models"
              value={modelSearch}
              onChange={(e) => setModelSearch(e.target.value)}
              className="w-full bg-[#fafafb] p-2 mb-2 pl-10 rounded text-gray-600"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="absolute left-2 top-[21px] transform -translate-y-1/2 w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <ul className="max-h-24 overflow-y-auto">
            {filteredModels.map((model) => (
              <li key={model} className="flex items-center text-sm mb-1">
                <input
                  type="checkbox"
                  value={model}
                  checked={selectedModels.includes(model)}
                  onChange={handleModelChange}
                  className="mr-1 w-4 h-4"
                />{" "}
                {model}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
