import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import ButtonComponent from "../components/ButtonComponent";
import ModalComponent from "../components/ModalComponent";

export default function MainScreen() {
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center mt-5">
        <ButtonComponent
          variant="primary"
          buttonText={"Button A"}
          modalName={"Modal A"}
          color={"#46139f"}
        />
        <div className="mt-2" />
        <ButtonComponent
          variant="primary"
          buttonText={"Button B"}
          modalName={"Modal B"}
          color={"#ff7f50"}
        />
      </div>

      <ModalComponent />
    </>
  );
}
