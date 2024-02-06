import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
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
  createUserSave,
  deleteHome,
  editHome,
  getHome,
  listHome,
  purchaseHome,
  removeUserSave,
} from "../../DataManagers/homeManager";
import PriceUpdateModal from "./PriceUpdateModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCartShopping,
  faXmark,
  faHouseChimney,
  faCircleCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";
import Confetti from "react-confetti";

export default function HomeDetails({ loggedInUser }) {
  const { id } = useParams();
  const [home, setHome] = useState(null);
  const [editedPrice, setEditedPrice] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState("");

  const navigate = useNavigate();

  const getData = () => {
    getHome(id).then(setHome);
  };

  useEffect(() => {
    getData();
  }, []);

  // triggered when editedPrice changes and isModalOpen is false. It then calls handleSubmitPriceChange() to save the price change to home object
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
      // adds userProfileId to the home object
      purchaseHome(id, userId).then(() => {
        //timeout so user can see the confetti drop
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
    getData();
  };

  // sell home that user owns
  const handleHomeListingClick = (id) => {
    const confirm = window.confirm(
      `Are you sure you want to list property at ${
        home.streetAddress
      } for $${home.price.toLocaleString("en-US")}?`
    );
    if (confirm) {
      listHome(id).then(() => {
        navigate("/userhomes");
      });
    }
  };

  // close details view and return to home list or user homes depending ehat view user is currently in
  const handleCloseButtonClick = () => {
    if (loggedInUser.id === home.userProfileId) {
      navigate("/userhomes");
    } else {
      navigate("/homes");
    }
  };

  // handles the user save and user unsave
  const toggleUserSave = async (event, home) => {
    event.preventDefault();

    // find if user has saved home already
    const userSavedHome = home.userSaves.find(
      (save) => save.userProfileId === loggedInUser.id
    );

    if (userSavedHome) {
      // if home is saved, show removed message
      setAlertMessage("Home has been removed from your saved properties.");
      setAlertVisible(true);
      // remove the user save from UserSaves table
      await removeUserSave(home.id, loggedInUser.id);
      const updatedHome = getHome(id);
      // set state
      getData(updatedHome);
    } else {
      // if home is not saved, show added to saves message with link
      setAlertMessage(
        <div>
          Home has been added to your saved properties. View all your saves
          <Link to="/usersaves"> here</Link>.
        </div>
      );
      setAlertVisible(true);
      // add new user save to UserSaves table
      const newSave = await createUserSave(home.id, loggedInUser.id);
      // spread operator to add new user save to array
      const updatedHomes = getHome(id, newSave);
      // set state
      getData(updatedHomes);
    }

    // hide alert after 4 seconds
    setTimeout(() => {
      setAlertVisible(false);
      setAlertMessage("");
    }, 4000);
  };

  return (
    <Container
      key={`home-${home.id}`}
      style={{ width: "80%", display: "flex" }}
      className="mt-4"
    >
      <div style={{ position: "relative" }}>{isConfirmed && <Confetti />}</div>
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
              {home.sold === false && (
                <div
                  style={{
                    color: "#db6960",
                    zIndex: 1,
                  }}
                  onClick={(event) => toggleUserSave(event, home)}
                >
                  <FontAwesomeIcon
                    icon={
                      home.userSaves &&
                      !home.userSaves.some(
                        (save) => save.userProfileId === loggedInUser.id
                      )
                        ? outlineHeart
                        : solidHeart
                    }
                  />
                </div>
              )}
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
                  <strong>{home.daysOnMarket} days </strong>on Dream Dwellings |{" "}
                  <strong>{home.userSaves.length}</strong> saves
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
                    
                    <Button className="mt-5" color="white" style={{color: "white", border: "2px solid #0D6EFD"}}>
                      <a
                        href="mailto:jeffrey@kbwtech.com?subject=Home%20Inquiry&body=I%20am%20very%20interested%20in%20this%20home."
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#0D6EFD", textDecoration: "none" }}
                      >
                        <FontAwesomeIcon icon={faUser} /> Contact Agent
                      </a>
                    </Button>
                  </div>
                )}
                {home.userProfileId === loggedInUser.id && (
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
      {/* Alert for when user saves and unsaves a home */}
      <Alert
        style={{
          position: "fixed",
          top: "4%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        color="primary"
        isOpen={alertVisible}
        toggle={() => setAlertVisible(false)}
      >
        {/* Alert message is conditiionally rendered depending on the usersaves */}
        {alertMessage}
      </Alert>
    </Container>
  );
}
