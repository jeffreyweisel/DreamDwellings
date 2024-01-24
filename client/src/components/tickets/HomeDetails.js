import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { getHome } from "../../DataManagers/homeManager";


export default function HomeDetails() {
  const { id } = useParams();
  const [home, setHome] = useState(null);

  useEffect(() => {
    getHome(id).then(setHome);
  }, []);

  if (!home) {
    return null;
  }

  return (
    <Card key={`home-${home.id}`} style={{ width: '60rem' }} className="mb-4">
      <CardImg
        variant="top"
        src={home.homeImage}
        alt="homeimg"
        className="img-fluid"
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
      </CardBody>
    </Card>
  );
}