import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { closeModal } from "../Redux/actions/modalActions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { fetchContacts } from "../Redux/actions/contactActions";
import { setModalName, setCountryId } from "../Redux/actions/modalActions";
import SearchBox from "./SearchBox";
import { Card } from "react-bootstrap";

const ModalComponent = ({
  isOpen,
  closeModal,
  modalContent,
  contacts,
  loading,
  error,
  fetchContacts,
  setModalName,
  setCountryId,
  countryId,
}) => {
  const history = useHistory();
  const [onlyEven, setOnlyEven] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [prevModal, setPrevModal] = useState(modalContent);
  const [page, setPage] = useState(1);
  const contentRef = useRef(null);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleCheckboxChange = () => {
    setOnlyEven(!onlyEven);
  };

  const handleShowContactsClick = (button) => {
    setShowContacts(true);
    fetchContacts(560, "", page, countryId);

    if (modalContent === "Modal B" && button == 0) {
      setCountryId(226);

      history.push("ModalA");
      setModalName("Modal A");
      setPrevModal("Modal B");
    } else if (modalContent == "Modal A" && button == 1) {
      history.push("ModalB");
      setModalName("Modal B");
      setPrevModal("Modal A");
    }
  };

  const handleBackClick = () => {
    if (modalContent == "Modal A" && prevModal == "Modal B") {
      setShowContacts(false);

      setModalName("Modal B");
      history.push("ModalB");
    } else if (modalContent == "Modal B" && prevModal == "Modal A") {
      setShowContacts(false);

      setModalName("Modal A");
      history.push("ModalA");
    } else if (modalContent == "Modal C") {
      setSelectedContact(null);
      setModalName(prevModal);
      setPrevModal(modalContent);
    } else if (modalContent == "Modal A" && prevModal == "Modal C") {
      setShowContacts(false);

      setModalName("Modal A");
      history.push("ModalA");
    } else if (modalContent == "Modal B" && prevModal == "Modal C") {
      setShowContacts(false);

      setModalName("Modal B");
      history.push("ModalB");
    } else if (modalContent == "Modal A" && prevModal == "Modal A") {
      setShowContacts(false);

      setModalName("Modal A");
      history.push("ModalA");
    } else if (modalContent == "Modal B" && prevModal == "Modal B") {
      setShowContacts(false);

      setModalName("Modal B");
      history.push("ModalB");
    } else if (modalContent == "Modal A" && prevModal == undefined) {
      setShowContacts(false);

      setModalName("Modal A");
      history.push("ModalA");
    } else if (modalContent == "Modal B" && prevModal == undefined) {
      setShowContacts(false);

      setModalName("Modal b");
      history.push("ModalB");
    }
  };

  const handleSearch = (query) => {
    fetchContacts(560, query, page, countryId);
  };

  useEffect(() => {
    if (showContacts && page > 1) {
      fetchContacts(560, "", page, countryId, contacts);
    }
  }, [showContacts, page, countryId]);

  const lastContactRef = useCallback((node) => {
    if (loading) return;
    if (contentRef.current) contentRef.current.disconnect();
    contentRef.current = new IntersectionObserver((enteries) => {
      if (enteries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) contentRef.current.observe(node);
  });
  return (
    <Modal
      show={isOpen}
      onHide={() => {
        history.push("/");
        closeModal();
      }}
    >
      <Modal.Header>
        <Modal.Title>{modalContent}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showContacts ? (
          <>
            {selectedContact ? (
              <Card>
                <Card.Body>
                  <Card.Title>Contact Details</Card.Title>
                  <Card.Text>
                    <strong>Name:</strong> {selectedContact.first_name}{" "}
                    {selectedContact.last_name}
                  </Card.Text>
                  <Card.Text>
                    <strong>Email:</strong> {selectedContact.email || "N/A"}
                  </Card.Text>
                  <Card.Text>
                    <strong>Phone Number:</strong>{" "}
                    {selectedContact.phone_number}
                  </Card.Text>
                  <Card.Text>
                    <strong>Country:</strong> {selectedContact.country.iso}
                  </Card.Text>
                </Card.Body>
              </Card>
            ) : (
              <>
                <SearchBox onSearch={handleSearch} />

                {loading ? (
                  <p style={{ color: "black" }}>Loading...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : (
                  <div
                    style={{
                      height: "600px",
                      overflowY: "scroll",
                    }}
                  >
                    {Object.keys(contacts).length > 0 ? (
                      <>
                        {Object.keys(contacts).map((contact, index) => {
                          const contactId = contacts[contact].id;
                          const isEvenId = contactId % 2 === 0;

                          // Check if onlyEven is selected and the contact has an even ID
                          if (onlyEven && !isEvenId) {
                            return null; // Skip rendering this contact
                          }

                          if (index + 1 == Object.keys(contacts).length) {
                            return (
                              <div
                                key={contactId}
                                style={{
                                  gap: "10px",
                                  borderWidth: 1,
                                  borderColor: "black",
                                  borderRadius: 10,
                                  padding: 20,
                                  borderStyle: "solid",
                                  marginTop: 5,
                                }}
                                ref={lastContactRef}
                                onClick={() => {
                                  setPrevModal(modalContent);
                                  setModalName("Modal C");
                                  setSelectedContact(contacts[contact]);
                                }}
                              >
                                <p>
                                  {contacts[contact].first_name}{" "}
                                  {contacts[contact].last_name}
                                </p>
                                <p>Email: {contacts[contact].email || "N/A"}</p>
                                <p>
                                  Phone Number: {contacts[contact].phone_number}
                                </p>
                                <p>Country: {contacts[contact].country.iso}</p>
                              </div>
                            );
                          } else {
                            return (
                              <div
                                key={contactId}
                                style={{
                                  gap: "10px",
                                  borderWidth: 1,
                                  borderColor: "black",
                                  borderRadius: 10,
                                  padding: 20,
                                  borderStyle: "solid",
                                  marginTop: 5,
                                }}
                                onClick={() => {
                                  setPrevModal(modalContent);
                                  setModalName("Modal C");
                                  setSelectedContact(contacts[contact]);
                                }}
                              >
                                <p>
                                  {contacts[contact].first_name}{" "}
                                  {contacts[contact].last_name}
                                </p>
                                <p>Email: {contacts[contact].email || "N/A"}</p>
                                <p>
                                  Phone Number: {contacts[contact].phone_number}
                                </p>
                                <p>Country: {contacts[contact].country.iso}</p>
                              </div>
                            );
                          }
                        })}
                      </>
                    ) : (
                      <p>contacts list is empty</p>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Button
              variant="secondary"
              style={{ backgroundColor: "#46139f" }}
              onClick={() => handleShowContactsClick(0)}
            >
              All Contacts
            </Button>

            <Button
              variant="secondary"
              style={{ backgroundColor: "#ff7f50" }}
              onClick={() => handleShowContactsClick(1)}
            >
              US Contacts
            </Button>

            <Link to={"/"}>
              <Button
                variant="primary"
                onClick={closeModal}
                style={{
                  backgroundColor: "#ffff",
                  borderColor: "#46139f",
                  color: "black",
                }}
              >
                Close
              </Button>
            </Link>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "start" }}>
        {!showContacts && (
          <Form.Check
            type="checkbox"
            label="Only even"
            checked={onlyEven}
            onChange={handleCheckboxChange}
          />
        )}
        {showContacts && (
          <Button variant="primary" onClick={handleBackClick}>
            Back
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.modal.isOpen,
  modalContent: state.modal.modalContent,
  contacts: state.contacts.contacts,
  loading: state.contacts.loading,
  error: state.contacts.error,
  countryId: state.modal.countryId,
});

const mapDispatchToProps = {
  closeModal,
  fetchContacts,
  setModalName,
  setCountryId,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
