import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  FormGroup,
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
} from "@fortawesome/free-solid-svg-icons";

export default function HomeDetails({ loggedInUser }) {
  const { id } = useParams();
  const [home, setHome] = useState(null);
  const [editedPrice, setEditedPrice] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

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
      purchaseHome(id, userId).then(() => {
        navigate("/userhomes");
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
    const confirm = window.confirm("Are you suuuuureeeee?");
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
      style={{ width: "100%", display: "flex" }}
      className="mt-4"
    >
      <Row>
        <Col>
          <CardImg
            top
            src={home.homeImage}
            alt="homeimg"
            style={{ width: "600px", height: "400px" }}
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
              }}
            >
              <div>
                {home?.streetAddress}, {home?.city}, TN
              </div>
              <div>
                <FontAwesomeIcon icon={faXmark} onClick={handleCloseButtonClick} cursor='pointer'/>
              </div>
            </CardTitle>
            <FormGroup>
              <Label
                for="editedPrice"
                onClick={openModal}
                style={{ cursor: "pointer" }}
              >
                Price: ${home.price.toLocaleString("en-US")}
              </Label>
            </FormGroup>
            <CardText>
              {home.homeType.homeTypeName}
              <br />
              <strong>{home.bedNumber}</strong> bds |{" "}
              <strong>{home.bathNumber}</strong> ba |{" "}
              <strong>{home.squareFeet}</strong> sqft
              <br />
              <strong>Description:</strong> {home?.description} <br />
              <strong>Price per sqft:</strong> ${home.pricePerSqFt.toFixed(2)}
            </CardText>
            <>
              {home.sold === false && (
                <>
                  {loggedInUser.roles.includes("Admin") && (
                    <>
                      <Button onClick={() => handleDeleteClick(home.id)}>
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
                    onClick={() =>
                      handleHomePurchaseClick(home.id, loggedInUser.id)
                    }
                    color="primary"
                  >
                    <FontAwesomeIcon icon={faCartShopping} /> Purchase Home!
                  </Button>{" "}
                </>
              )}
              {home.userProfileId === loggedInUser.id && (
                <Button
                  color="primary"
                  onClick={() => handleHomeListingClick(home.id)}
                >
                  Sell Home
                </Button>
              )}
            </>
            {home.sold !== true && (
              <div className="mt-5">
                Days Listed: {home.daysOnMarket} | Saves:{" "}
                {home.userSaves.length}
              </div>
            )}
          </CardBody>
        </Col>
      </Row>
    </Container>
  );
}
