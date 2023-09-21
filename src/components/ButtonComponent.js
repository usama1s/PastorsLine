import React from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { openModal } from "../Redux/actions/modalActions";
import { Link } from "react-router-dom/cjs/react-router-dom";

const ButtonComponent = ({ buttonText, modalName, openModal, color }) => {
  const handleOpenModal = () => {
    openModal(modalName);
  };

  return (
    <Link to={modalName.replace(/\s/g, "")}>
      <Button
        variant="primary"
        onClick={handleOpenModal}
        style={{ backgroundColor: color, borderColor: color }}
      >
        {buttonText}
      </Button>
    </Link>
  );
};

const mapDispatchToProps = {
  openModal,
};

export default connect(null, mapDispatchToProps)(ButtonComponent);
