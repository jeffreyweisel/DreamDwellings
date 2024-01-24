import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import { getHomes } from "../../DataManagers/homeManager";

export default function UserSavedHomes({ loggedInUser }) {
  const [homes, setHomes] = useState([]);

  console.log("loggedInUser in userhomes:", loggedInUser);

  useEffect(() => {
    getHomes().then(setHomes);
  }, []);

  return (
    <>
      <h2>My Saves</h2>

      {homes
              .filter((c) => c.userSaves && c.userSaves.some(
                (save) => save.userProfileId === loggedInUser.id
              ))
              .map((home) => (
          <Card
            key={`home-${home.id}`}
            style={{ width: "50rem" }}
            className="mb-4"
          >
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
                <strong>Beds:</strong> {home.bedNumber} |{" "}
                <strong>Baths:</strong> {home.bathNumber}
                <br />
                <strong>Description:</strong> {home.description}
              </CardText>
            </CardBody>
          </Card>
        ))}
    </>
  );
}