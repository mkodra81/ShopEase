import React from "react";
import HeartIcon from "./HeartButton.jsx";
import TrashButton from "./TrashButton.jsx";
import Update from "./Update.jsx";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/products.js";
import Modal from "./Modal.jsx";
import SelectedProduct from "../pages/SelectedProduct.jsx";

const Card = ({ product }) => {
  const [viewProduct, setViewProduct] = React.useState(false);

  const openViewProduct = () => {
    setViewProduct(true);
  };

  const closeViewProduct = () => {
    setViewProduct(false);
  };

  return (
    <div className="group relative grid grid-rows-1 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link onClick={openViewProduct}>
        <img
          alt={product.name}
          src={product.image}
          className="aspect-w-4 max-h-72 w-full object-cover group-hover:opacity-90"
        />

        <h3 className="text-lg font-semibold text-gray-800 truncate ml-3 mt-3">
          {product.name}
        </h3>
      </Link>
      <div className="p-4">
        <p className="mt-2 text-sm text-gray-500">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-medium text-indigo-600">
            ${product.price}
          </p>
          <div className="flex space-x-2">
            <Update name={product} />
            <TrashButton name={product} />
            <HeartIcon name={product} />
          </div>
        </div>
      </div>

      <Modal isOpen={viewProduct} closeModal={closeViewProduct}>
        <SelectedProduct product={product} />
      </Modal>
    </div>
  );
};

export default Card;
