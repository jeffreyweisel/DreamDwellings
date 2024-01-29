import { useEffect, useState } from "react";
import { Card, CardBody, CardText, CardImg, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { getHomes } from "../../DataManagers/homeManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faLocationArrow } from "@fortawesome/free-solid-svg-icons";

export default function HomeList() {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    getHomes().then(setHomes);
    console.log(homes);
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap">
        {homes
          .filter((h) => h.userProfileId === null)
          .map((home) => (
            <Card key={`home-${home.id}`} style={{ width: "20rem" }}>
              <Link to={`${home.id}`}>
                <CardImg
                  style={{ objectFit: "cover", height: "200px" }}
                  variant="top"
                  src={home.homeImage}
                  alt="homeimg"
                />
              </Link>
              <CardBody>
                <CardText>
                  <strong>${home.price.toLocaleString("en-US")}</strong> -{" "}
                  <small>{home.homeType.homeTypeName} for sale</small>
                  <br />
                  <strong>{home.bedNumber}</strong> bds |{" "}
                  <strong>{home.bathNumber}</strong> ba |{" "}
                  <strong>{home.squareFeet}</strong> sqft
                  <br />
                  <FontAwesomeIcon icon={faLocationDot} /> {home.streetAddress}, {home.city}, TN
                </CardText>
                <br />
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  );
}
