import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Container,
  Label,
  Row,
} from "reactstrap";
import {
  deleteHome,
  editHome,
  getHome,
  listHome,
  purchaseHome,
} from "../../DataManagers/homeManager";
import PriceUpdateModal from "./PriceUpdateModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faTrash,
  faCartShopping,
  faXmark,
  faHouseChimney,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Confetti from 'react-confetti';


export default function HomeDetails({ loggedInUser }) {
  const { id } = useParams();
  const [home, setHome] = useState(null);
  const [editedPrice, setEditedPrice] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getHome(id).then(setHome);
  }, []);

  useEffect(() => {
    if (editedPrice !== 0 && !isModalOpen) {
      handleSubmitPriceChange();
      setModalOpen(false);
    }
  }, [editedPrice, isModalOpen]);

  if (!home) {
    return null;
  }

  // close and open modal functions
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // purchase home button click
  const handleHomePurchaseClick = (id, userId) => {
    const confirm = window.confirm(
      `You are about to purchase home at ${home.streetAddress} for $${home.price}. Congrats!`
    );
    if (confirm) {
      setIsConfirmed(true);
      purchaseHome(id, userId).then(() => {
        setTimeout(() => {
          setIsConfirmed(false);
          navigate("/userhomes");
        }, 3000);
      });
    }
  };

  // delete button click
  const handleDeleteClick = (id) => {
    const confirm = window.confirm(
      `Are you sure you want to remove listing at ${home.streetAddress}?`
    );
    if (confirm) {
      deleteHome(id).then(() => {
        navigate("/homes");
      });
    }
  };

  // price change in the modal on a home
  const handleSubmitPriceChange = async () => {
    console.log("Submitting price change. New price:", editedPrice);
    await editHome(home.id, editedPrice);
    navigate("/homes");
  };

  // sell home that user owns
  const handleHomeListingClick = (id) => {
    const confirm = window.confirm("Are you sure you want to sell this home?");
    if (confirm) {
      listHome(id).then(() => {
        navigate("/userhomes");
      });
    }
  };

  // close details view and return to home list
  const handleCloseButtonClick = () => {
    navigate("/homes");
  };

  return (
    <Container
      key={`home-${home.id}`}
      style={{ width: "80%", display: "flex" }}
      className="mt-4"
    >
      <div style={{ position: 'relative' }}>
      {isConfirmed && <Confetti />}
    </div>
      <Row>
        <Col>
          <CardImg
            top
            src={home.homeImage}
            alt="homeimg"
            style={{ width: "600px", height: "400px", borderRadius: "10px" }}
          />
        </Col>
        <Col>
          <CardBody>
            <CardTitle
              className="h5"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "30px",
              }}
            >
              <div>
                {home?.streetAddress}, {home?.city}, TN
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={handleCloseButtonClick}
                  cursor="pointer"
                />
              </div>
            </CardTitle>
            <div style={{ fontSize: "25px" }}>
              <strong>{home.bedNumber}</strong> bds |{" "}
              <strong>{home.bathNumber}</strong> ba |{" "}
              <strong>{home.squareFeet}</strong> sqft
              <br />
            </div>
            <div style={{ fontSize: "20px" }}>
              <FontAwesomeIcon icon={faHouseChimney} />{" "}
              {home.homeType.homeTypeName}
            </div>
            <br />
            <Label
              for="editedPrice"
              style={{ fontSize: "18px", cursor: "pointer" }}
              onClick={openModal}
            >
              Price: ${home.price.toLocaleString("en-US")}
            </Label>
            <br />
            <strong>Description:</strong> {home?.description} <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "0px",
                justifyContent: "space-between",
              }}
            >
              {home.sold !== true && (
                <div className="mt-5">
                <strong>{home.daysOnMarket} days </strong>on Dream Dwellings {" "} | {" "} <strong>{home.userSaves.length}</strong> saves
                </div>
              )}
              <>
                {home.sold === false && (
                  <div style={{ alignSelf: "flex-end" }}>
                    {loggedInUser.roles.includes("Admin") && (
                      <>
                        <Button
                          className="mt-5"
                          onClick={() => handleDeleteClick(home.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </Button>

                        <PriceUpdateModal
                          // pass props needed to the PriceUpdateModal
                          isOpen={isModalOpen}
                          toggleModal={closeModal}
                          currentPrice={home.price}
                          setEditedPrice={setEditedPrice}
                          onSubmit={handleSubmitPriceChange}
                        />
                      </>
                    )}
                    <Button
                      className="mt-5"
                      onClick={() =>
                        handleHomePurchaseClick(home.id, loggedInUser.id)
                      }
                      color="primary"
                    >
                      <FontAwesomeIcon icon={faCartShopping} /> Purchase
                    </Button>{" "}
                  </div>
                )}
                {home.userProfileId === loggedInUser.id && (

                      <PriceUpdateModal
                        // pass props needed to the PriceUpdateModal
                        isOpen={isModalOpen}
                        toggleModal={closeModal}
                        currentPrice={home.price}
                        setEditedPrice={setEditedPrice}
                        onSubmit={handleSubmitPriceChange}
                      />
                    </>
                  )}
                  

                  <Button
                    className="mt-5"
                    style={{ alignSelf: "flex-end" }}
                    color="primary"
                    onClick={() => handleHomeListingClick(home.id)}
                  >
                    <FontAwesomeIcon icon={faCircleCheck} /> Sell Home
                  </Button>
                )}
              </>
            </div>
          </CardBody>
        </Col>
      </Row>
    </Container>
  );
}
