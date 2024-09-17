"use client";
import { CircleX } from "lucide-react";
import React, { useState } from "react";
import Modal from "react-modal";

// Modal.setAppElement("root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "350px",
    borderRadius: 10,
  },
  overlay: {
    background: "rgba(0,0,0, .5)",
  },
};

interface IProps {
  message?: string;
  isOpen: boolean;
  onShowPopup: (value: boolean) => void;
  onAccept: () => void;
}
const Popup = ({
  message = "Are you sure?",
  isOpen = false,
  onShowPopup,
  onAccept,
}: IProps) => {
  function toggleModal() {
    onShowPopup(!isOpen);
  }

  return (
    <>
      <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-end">
          <CircleX
            onClick={toggleModal}
            className="text-red-500 cursor-pointer hover:opacity-80"
          />
        </div>
        <div className="pt-4 flex flex-col">
          <h4 className="text-2xl text-center font-weight">{message}</h4>
          <div className="pt-6 flex justify-center gap-x-3">
            <button
              className="bg-blue-400 px-4 py-2 text-white hover:opacity-80 rounded-md"
              onClick={() => {
                onAccept();
                toggleModal();
              }}
            >
              Confirm
            </button>
            <button
              className="bg-slate-400 px-4 py-2 text-white hover:opacity-80 rounded-md"
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Popup;
