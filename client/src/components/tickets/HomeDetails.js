import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import {
  createUserSave,
  deleteHome,
  editHome,
  getHome,
  purchaseHome,
} from "../../DataManagers/homeManager";
import PriceUpdateModal from "./PriceUpdateModal";

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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeAndResetModal = () => {
    setModalOpen(false);
   
  };

  if (!home) {
    return null;
  }

  const handleSaveButtonClick = (id) => {
    createUserSave(id, loggedInUser.id).then(() => {
      navigate("/usersaves");
    });
  };

  const handleHomePurchaseClick = (id, userId) => {
    purchaseHome(id, userId).then(() => {
      navigate("/homes");
    });
  };

  const handleDeleteClick = (id) => {
    deleteHome(id).then(() => {
      navigate("/homes");
    });
  };

  const handleSubmitPriceChange = async () => {
    console.log("Submitting price change. New price:", editedPrice);
    await editHome(home.id, editedPrice);
    navigate("/homes");
  };

  return (
    <Card key={`home-${home.id}`} style={{ width: "100%", display: 'flex' }} className="mb-4">
      <Row noGutters>
        <Col md={4}>
          <CardImg top src={home.homeImage} alt="homeimg" style={{ width: "100%" }} />
        </Col>
        <Col md={8}>
          <CardBody>
            <CardTitle className="h5">
              {home?.streetAddress}, {home?.city}, TN
            </CardTitle>
            <FormGroup>
              <Label
                for="editedPrice"
                onClick={openModal}
                style={{ cursor: "pointer" }}
              >
                Price: ${home?.price}
              </Label>
            </FormGroup>
            <CardText>
              <strong>Beds:</strong> {home?.bedNumber} | <strong>Baths:</strong>{" "}
              {home?.bathNumber}
              <br />
              <strong>Description:</strong> {home?.description}
            </CardText>
            {home.sold === false && (
              <>
                <Button onClick={() => handleSaveButtonClick(home.id)}>Save</Button>
                <Button
                  onClick={() => handleHomePurchaseClick(home.id, loggedInUser.id)}
                  variant="primary"
                >
                  Purchase Home!
                </Button>{" "}
                <Button onClick={() => handleDeleteClick(home.id)}>Delete</Button>
                <PriceUpdateModal
                  isOpen={isModalOpen}
                  toggleModal={closeAndResetModal}
                  currentPrice={home.price}
                  setEditedPrice={setEditedPrice}
                  onSubmit={handleSubmitPriceChange}
                />
              </>
            )}
          </CardBody>
        </Col>
      </Row>
    </Card>
  );
}
