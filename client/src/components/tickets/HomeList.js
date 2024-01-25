import { useEffect, useState } from "react";
import { Card, CardBody, CardText, CardImg, Button } from "reactstrap";
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
      <div className="d-flex flex-wrap">
        {homes
          .filter((h) => h.userProfileId === null)
          .map((home) => (
            <Card key={`home-${home.id}`} style={{ width: "20rem" }}>
              <CardImg
                variant="top"
                src={home.homeImage}
                alt="homeimg"
                
              />
              <CardBody>
                <CardText>
                <strong>${home.price.toLocaleString('en-US')}</strong> - {" "}
                <small>{home.homeType.homeTypeName} for sale</small>
                 <br />
                  <strong>Beds:</strong> {home.bedNumber}  | {" "}
                  <strong>Baths:</strong> {home.bathNumber}  | {" "} 
                  <strong>{home.squareFeet}</strong> sq ft
                  <br />
                  {home.streetAddress}, {home.city},
                  TN
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
