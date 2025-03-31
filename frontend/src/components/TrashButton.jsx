import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useProductStore } from "../store/products.js";

const TrashButton = (props) => {

  const deleteProduct = useProductStore((state) => state.deleteProduct)

  const handleDelete = () => {
    setTimeout(() => {
      deleteProduct(props.name._id);
    }, 200);  }

  return (
    <button onClick={handleDelete}>
      <TrashIcon className="w-6 h-6 transition duration-200" />
    </button>
  );
};

export default TrashButton;
