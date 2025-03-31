import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal.jsx";
import ProductForm from "./ProductForm.jsx";
import Search from "./Search.jsx";

export default function NavBar() {
  const [addProduct, setAddProduct] = useState(false);

  const openAddProduct = () => {
    setAddProduct(true);
  };

  const closeAddProduct = () => {
    setAddProduct(false);
  };

  return (
    <nav className="w-full bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-5 py-2">
        {/* Logo/Home Link */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-indigo-100 hover:text-indigo-300 transition duration-300 mb-4 lg:mb-0"
        >
          ShopEase
        </Link>

        <Search />

        {/* Navigation Links */}
        <div className="flex flex-col lg:flex-row items-center">
          <button
            onClick={openAddProduct}
            className="px-4 py-2 my-2 mx-2 bg-indigo-700 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-300"
          >
            Add Product
          </button>
          <Modal isOpen={addProduct} closeModal={closeAddProduct}>
            <ProductForm
              closeModal={closeAddProduct}
              titleHtml={"Create a New Product"}
              buttonHtml={"Add Product"}
            />
          </Modal>
          <Link
            to="/favourites"
            className="px-4 py-2 bg-indigo-700 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-300"
          >
            Favourites
          </Link>
        </div>
      </div>
    </nav>
  );
}
