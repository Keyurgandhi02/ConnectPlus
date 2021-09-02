import React from "react";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};
const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="contentModal">{props.children}</div>
    </div>
  );
};

const overlayElement = document.getElementById("overlays");
function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        overlayElement
      )}
      ;
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overlayElement
      )}
    </Fragment>
  );
}

export default Modal;
