import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { createUserSave, deleteHome, getHome, purchaseHome } from "../../DataManagers/homeManager";


export default function HomeDetails({loggedInUser}) {
  const { id } = useParams();
  const [home, setHome] = useState(null);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getHome(id).then(setHome);
  }, []);

  if (!home) {
    return null;
  }

  const handleSaveButtonClick = (id) => {
    createUserSave(id, loggedInUser.id).then(() => {
      navigate('/usersaves')
    })
  }

  const handleHomePurchaseClick = (id, userId) => {
    purchaseHome(id, userId).then(() => {
      navigate('/homes')
    });
  };

  const handleDeleteClick = (id) => {
    deleteHome(id).then(() => {
      navigate('/homes')
    });
  };

  
  

  

  return (
    <Card key={`home-${home.id}`} style={{ width: '20rem' }} className="mb-4">
      <CardImg
        top
        src={home.homeImage}
        alt="homeimg"
        width="100%"
      />
      <CardBody>
        <CardTitle className="h5">
          {home.streetAddress}, {home.city}, TN
        </CardTitle>
        <CardSubtitle className="mb-2 text-muted">
          Price: ${home.price}
        </CardSubtitle>
        <CardText>
          <strong>Beds:</strong> {home.bedNumber} | <strong>Baths:</strong> {home.bathNumber}<br />
          <strong>Description:</strong> {home.description}
        </CardText>
        {home.sold === false && (
          <>
            <Button onClick={() => handleSaveButtonClick(home.id)}>
              Save
            </Button>
            <Button onClick={() => handleHomePurchaseClick(home.id, loggedInUser.id)} variant="primary">
              Purchase Home!
            </Button>{' '}
            <Button onClick={() => handleDeleteClick(home.id)}>
              Delete
            </Button>
          </>
        )}
      </CardBody>
    </Card>
  );
}