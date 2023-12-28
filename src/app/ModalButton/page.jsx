"use client";
// ModalButton.jsx
import React, { useState } from "react";
import Register from "../component/Register/page";
import Login from "../component/Login/page";

const ModalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    console.log("Abriendo el modal");
    setIsModalOpen(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => openModal(<Register closeModal={closeModal} />)}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Registrar
      </button>

      <button
        type="button"
        onClick={() => openModal(<Login closeModal={closeModal} />)}
        className="bg-green-500 text-white py-2 px-4 ml-4 rounded"
      >
        Iniciar Sesión
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 max-w-md mx-auto">
            <span
              className="close text-2xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            {modalContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalButton;
