import { useEffect, useState } from "react";
import { Card, CardBody, CardImg, CardText } from "reactstrap";
import { getHomes } from "../../DataManagers/homeManager";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarCheck,
  faHouseCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import "./Card.css";

export default function UserHomes({ loggedInUser }) {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    getHomes().then(setHomes);
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
          }}
        >
         <h4>  <FontAwesomeIcon icon={faHouseCircleCheck} /> Owned Properties</h4>
        </div>
        <div className="d-flex flex-wrap">
          {homes
            .filter((h) => h.userProfileId === loggedInUser.id)
            .map((home) => (
              <Card
                key={`home-${home.id}`}
                style={{ width: "20rem", margin: "2px" }}
                className="hover-card"
              >
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
                  <CardText style={{ marginBottom: "4px" }}>
                    <strong>
                      <FontAwesomeIcon icon={faCalendarCheck} /> Purchased on{" "}
                      {new Date(home.purchasedOn).toLocaleDateString("en-US")}
                    </strong>{" "}
                    <br />
                    <br />
                    <strong>{home.bedNumber}</strong> bds |{" "}
                    <strong>{home.bathNumber}</strong> ba |{" "}
                    <strong>{home.squareFeet}</strong> sqft
                    <br />
                    <FontAwesomeIcon icon={faLocationDot} />{" "}
                    {home.streetAddress}, {home.city}, TN
                  </CardText>
                  <br />
                </CardBody>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
