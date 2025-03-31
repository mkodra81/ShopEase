import React, { useEffect } from "react";
import { useProductStore } from "../store/products.js";
import Card from "./Card.jsx";

const Products = () => {
  const getProducts = useProductStore((state) => state.getProducts);
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    try {
      getProducts();
    } catch (error) {
      console.log("Error in fetching products", error);
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Customers also purchased
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8">
          {products.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;