import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardImg, CardText, Input } from "reactstrap";
import { getHomes } from "../../DataManagers/homeManager";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarCheck,
  faHouseCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./Card.css";

export default function UserHomes({ loggedInUser }) {
  const [homes, setHomes] = useState([]);
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getHomes().then(setHomes);
  }, []);

  // Filtered State
  useEffect(() => {
    let filteredHomesResult = homes;

    // Filter by city via search bar
    if (searchTerm.length > 0) {
      filteredHomesResult = filteredHomesResult.filter((h) =>
        h.streetAddress.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // final filtered state
    setFilteredHomes(filteredHomesResult);
  }, [searchTerm, homes]);

  // clears all filter inputs and resets to original state
  const clearFilters = () => {
    setSearchTerm("");
    setFilteredHomes(homes);
  };

  return (
    <>
      <div className="container mt-4">
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
            flexDirection: "column",
          }}
        >
          <h4>
            {" "}
            <FontAwesomeIcon icon={faHouseCircleCheck} /> Owned Properties
          </h4>
        </div>
        <div
          className="search-wrapper"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Input
              style={{ width: "1200px", marginBottom: "10px" }}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              type="text"
              placeholder="Address Search"
              className="player-input"
              value={searchTerm}
            />
          </div>
          <div>
            <Button color="primary" onClick={clearFilters}>
              {" "}
              <FontAwesomeIcon icon={faCircleXmark} /> Reset
            </Button>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {filteredHomes
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
