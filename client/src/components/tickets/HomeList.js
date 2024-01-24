import { useEffect, useState } from "react";
import { Card, CardBody, CardText, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import { getHomes } from "../../DataManagers/homeManager";

export default function HomeList() {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    getHomes().then(setHomes);
    console.log(homes);
  }, []);

  return (
    <div className="container mt-4">
      <div className="sub-menu  d-flex">
        <Link to="/homes/create" className="ml-2">
          Add
        </Link>
      </div>
      <div className="d-flex flex-wrap">
        {homes
          .filter((h) => h.userProfileId === null)
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
                  <Link to={`${home.id}`}>Details</Link>
                </small>
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  );
}
