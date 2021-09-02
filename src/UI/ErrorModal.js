import React from "react";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import "./ErrorModal.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};
const ModalOverlay = (props) => {
  return (
    <div className="modalError">
      <div className="contentModalError">{props.children}</div>
    </div>
  );
};

const overlayElement = document.getElementById("overlays");
function ErrorModal(props) {
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

export default ErrorModal;
