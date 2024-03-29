import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "reactstrap";

export default function PriceUpdateModal({
  // props passed to component from details
  isOpen,
  toggleModal,
  currentPrice,
  onSubmit,
  setEditedPrice,
}) {
  const [newPrice, setNewPrice] = useState(currentPrice);

  useEffect(() => {
    setNewPrice(currentPrice);
  }, [currentPrice]);

  const handlePriceChange = (e) => {
    const newPriceValue = e.target.value;
    setNewPrice(newPriceValue);
    setEditedPrice(newPriceValue);
    console.log(newPriceValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("newPrice:", newPrice);
    onSubmit(newPrice);
    toggleModal();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Update Price</ModalHeader>
      <ModalBody>
        <Input type="number" value={newPrice} onChange={handlePriceChange} />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={ (e) => handleSubmit(e)}>
          Save
        </Button>
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
