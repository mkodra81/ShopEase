import React, {useState} from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Modal from "./Modal.jsx";
import ProductForm from "./ProductForm.jsx";

const Update = (props) => {
  const [updateProduct, setUpdateProduct] = useState(false);

  const openUpdateProduct = () => {
    setUpdateProduct(true);
  };

  const closeUpdateProduct = () => {
    setUpdateProduct(false);
  };

  return (
    <>
      <button onClick={openUpdateProduct}>
        <PencilSquareIcon className="w-7 h-7" />
      </button>
      <Modal isOpen={updateProduct} closeModal={closeUpdateProduct}>
      <ProductForm closeModal={closeUpdateProduct} titleHtml={`Update "${props.name.name}"`} buttonHtml={"Update Product"} product={props}/>
      </Modal>
    </>
  );
};

export default Update;
