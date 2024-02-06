import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardImg, CardText } from "reactstrap";
import { createUserSave, getHomes, removeUserSave } from "../../DataManagers/homeManager";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "./Card.css"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";

export default function UserSavedHomes({ loggedInUser }) {
  const [homes, setHomes] = useState([]);

  const getData = () => {
    getHomes().then(setHomes);
  }
  
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mt-4">
      <div
        style={{
          display: "flex",
          marginBottom: "20px",
        }}
      >
        <h4> <FontAwesomeIcon icon={faHouseUser} /> {" "}
       <>Saved Properties</></h4>
      </div>
      <div className="d-flex flex-wrap">
        {homes
          .filter(
            (c) =>
              c.userSaves &&
              //check if any element in the userSaves array has a userProfileId matching the loggedInUser.id
              c.userSaves.some((save) => save.userProfileId === loggedInUser.id)
          )
          .map((home) => (
            <Card key={`home-${home.id}`} style={{ width: "20rem", margin: '2px' }} className="hover-card">
              <Link to={`/homes/${home.id}`}>
              <div className="card-img-container">
                <CardImg
                  style={{ objectFit: "cover", height: "200px" }}
                  variant="top"
                  src={home.homeImage}
                  alt="homeimg"
                />
                <div className="card-overlay">
                    <p>Show Details</p>
                  </div>
                </div>
              </Link>
              <CardBody>
                <CardText  style={{ marginBottom: "4px"}}>
                  <strong>${home.price.toLocaleString("en-US")}</strong> -{" "}
                  <small>{home.homeType.homeTypeName} for sale</small>
                  <br />
                  <strong>{home.bedNumber}</strong> bds |{" "}
                  <strong>{home.bathNumber}</strong> ba |{" "}
                  <strong>{home.squareFeet}</strong> sqft
                  <br />
                  <FontAwesomeIcon icon={faLocationDot} /> {home.streetAddress},{" "}
                  {home.city}, TN
                </CardText>
                <br />
              </CardBody>
              {/* <Button onClick={() => handleUserUnsaveButton(home.id)}>
                Unsave
              </Button> */}
            </Card>
          ))}
      </div>
    </div>
  );
}
