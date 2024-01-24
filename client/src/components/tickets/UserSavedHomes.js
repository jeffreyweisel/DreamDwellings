import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
} from "reactstrap";
import { getHomes, removeUserSave } from "../../DataManagers/homeManager";
import { Link, useNavigate } from "react-router-dom";


export default function UserSavedHomes({ loggedInUser }) {
  const [homes, setHomes] = useState([]);
  const navigate = useNavigate()
  

  useEffect(() => {
    getHomes().then(setHomes);
  }, []);

  const handleUserUnsaveButton = (id) => {
    console.log('Clicked Unsave with homeId:', id, 'and userId:', loggedInUser.id);
    removeUserSave(id, loggedInUser.id).then(() => {
      navigate('/homes')

    })
  }

  return (
    <div className="container mt-4">
      <div className="sub-menu bg-light d-flex">
        {homes
          .filter(
            (c) =>
              c.userSaves &&
              c.userSaves.some((save) => save.userProfileId === loggedInUser.id)
          )
          .map((home) => (
            <Card key={`home-${home.id}`} style={{ width: "20rem" }}>
              <CardImg
                variant="top"
                src={home.homeImage}
                alt="homeimg"
                className="img-fluid"
              />
              <CardBody>
                <CardText>
                   <br />
                  <strong>Address:</strong> {home.streetAddress}, {home.city},
                  TN <br />
                  <strong>Price:</strong> ${home.price}
                </CardText>
                <small className="text-muted">
                  <Link to={`/homes/${home.id}`}>Details</Link>
                </small>
              </CardBody>
              < Button 
               onClick={() => handleUserUnsaveButton(home.id)}
              >Unsave
                </Button>
            </Card>
          ))}
      </div>
    </div>
  );
}
