import React, { useState, useEffect } from "react";
import { useProductStore } from "../store/products";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import SelectedProduct from "../pages/SelectedProduct";

const Search = () => {
  const [query, setQuery] = useState("");
  const [viewProduct, setViewProduct] = useState(false);

  const openViewProduct = () => {
    setViewProduct(true);
  };

  const closeViewProduct = () => {
    setViewProduct(false);
  };

  const searchProductsAsync = useProductStore(
    (state) => state.searchProductsAsync
  );
  const searchProducts = useProductStore((state) => state.searchProducts);

  const debouncedSearch = debounce((query) => {
    searchProductsAsync(query);
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query]);

  return (
    <div className="relative w-64">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search products..."
        className="w-full p-2 border border-gray-300 rounded text-black"
      />
      {query.length > 1 && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 text-black rounded shadow z-10">
          {searchProducts.map((result) => (
            <div className="p-2 hover:bg-gray-100 cursor-pointer">
              {" "}
              <Link key={result._id} onClick={openViewProduct}>
                {result.name}
              </Link>
              <Modal isOpen={viewProduct} closeModal={closeViewProduct}>
                <SelectedProduct product={result} />
              </Modal>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
