import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardImg, CardText } from "reactstrap";
import { getHomes, listHome } from "../../DataManagers/homeManager";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

export default function UserHomes({ loggedInUser }) {
  const [homes, setHomes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getHomes().then(setHomes);
  }, []);

  //${home.price.toLocaleString('en-US')}

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex flex-wrap">
          {homes
            .filter((h) => h.userProfileId === loggedInUser.id)
            .map((home) => (
              <Card key={`home-${home.id}`} style={{ width: "20rem" }}>
                <Link to={`/homes/${home.id}`}>
                <CardImg
                  style={{ objectFit: "cover", height: "200px" }}
                  variant="top"
                  src={home.homeImage}
                  alt="homeimg"
                />
                </Link>
                <CardBody>
                  <CardText>
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
                    <FontAwesomeIcon icon={faLocationDot} /> {home.streetAddress}, {home.city}, TN
                  </CardText>
                 <br/>
                </CardBody>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
