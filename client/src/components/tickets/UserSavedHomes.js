import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
} from "reactstrap";
import { getHomes } from "../../DataManagers/homeManager";
import { Link } from "react-router-dom";

export default function UserSavedHomes({ loggedInUser }) {
  const [homes, setHomes] = useState([]);

  console.log("loggedInUser in userhomes:", loggedInUser);

  useEffect(() => {
    getHomes().then(setHomes);
  }, []);

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
            </Card>
          ))}
      </div>
    </div>
  );
}
