import { useEffect, useState } from "react";
import { Card, CardBody, CardImg, CardText } from "reactstrap";
import { getHomes } from "../../DataManagers/homeManager";
import { Link } from "react-router-dom";

export default function UserHomes({ loggedInUser }) {
  const [homes, setHomes] = useState([]);

  console.log("loggedInUser in userhomes:", loggedInUser);

  useEffect(() => {
    getHomes().then(setHomes);
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="sub-menu bg-light d-flex">
          {homes
            .filter((h) => h.userProfileId === loggedInUser.id)
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
                    <strong>${home.price.toLocaleString("en-US")}</strong>
                    <br />
                    <strong>Beds:</strong> {home.bedNumber} |{" "}
                    <strong>Baths:</strong> {home.bathNumber} |{" "}
                    {home.squareFeet} sq ft
                    <br />
                    {home.streetAddress}, {home.city}, TN
                  </CardText>
                  <small className="text-muted">
                    <Link to={`${home.id}`}>Details</Link>
                  </small>
                </CardBody>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
