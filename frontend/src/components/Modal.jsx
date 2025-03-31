import React from "react";

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <button onClick={closeModal} className="absolute top-2 right-2">
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
