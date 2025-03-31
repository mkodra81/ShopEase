import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/products.js";

const ProductForm = ({ closeModal, titleHtml, buttonHtml, product }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Zustand store actions
  const addNewProduct = useProductStore((state) => state.addNewProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const handleProduct = (e) => {
    e.preventDefault();

    if (titleHtml === "Create a New Product") {
      handleAddProduct(e);
      return;
    }
    handleUpdateProduct(e);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      setError("All fields are required.");
      return;
    }

    try {
      addNewProduct(newProduct);
      setSuccess("Product added successfully!");

      setNewProduct({ name: "", price: "", image: "" });
      setError(""); // Clear error if any
    } catch (err) {
      setError("There was an error adding the product.");
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.name && !newProduct.price && !newProduct.image) {
      setError("At least a field is required.");
      return;
    }

    let updatedProduct = {};

    if(newProduct.name){
      updatedProduct.name = newProduct.name
    }
    if (newProduct.price) {
      updatedProduct.price = newProduct.price
    } 
    if (newProduct.image) {
      updatedProduct.image = newProduct.image
    } 

    try {
      updateProduct(product.name._id, updatedProduct);
      setSuccess("Product updated successfully!");

      setNewProduct({ name: "", price: "", image: "" });
      setError(""); // Clear error if any
    } catch (err) {
      setError("There was an error updating the product.");
    }

  };

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          {titleHtml}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleProduct}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                value={newProduct.name}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Price
            </label>
            <div className="mt-2">
              <input
                id="price"
                name="price"
                type="number"
                value={newProduct.price}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Image URL
            </label>
            <div className="mt-2">
              <input
                id="image"
                name="image"
                type="text"
                value={newProduct.image}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="mt-3 px-4 py-1.5 bg-red-500 text-white rounded-lg"
          >
            Go To HomePage
          </button>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {buttonHtml}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
