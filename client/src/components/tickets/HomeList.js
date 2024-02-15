import { useEffect, useState } from "react";
import { Card, CardBody, CardText, CardImg, Alert, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import {
  createUserSave,
  getHomes,
  removeUserSave,
} from "../../DataManagers/homeManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSignHanging } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";
import { getHomeTypes } from "../../DataManagers/homeTypeManager";
import HomeFilterBar from "./HomeFilterBar";
import "./Card.css";

export default function HomeList({ loggedInUser }) {
  const [homes, setHomes] = useState([]);
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHomeType, setSelectedHomeType] = useState("");
  const [homeTypes, setHomeTypes] = useState([]);
  const [selectedBedNumber, setSelectedBedNumber] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const getData = () => {
    getHomes().then((hArray) => {
      setHomes(hArray);
      setFilteredHomes(hArray);
    });
    getHomeTypes().then(setHomeTypes);
    console.log(homes);
  };

  // On render state
  useEffect(() => {
    getData();
  }, []);

  // Filtered State
  useEffect(() => {
    let filteredHomesResult = homes;

    // Filter by city via search bar
    if (searchTerm.length > 0) {
      filteredHomesResult = filteredHomesResult.filter((h) =>
        h.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by Home Type 
    if (selectedHomeType) {
      filteredHomesResult = filteredHomesResult.filter(
        (h) => h.homeTypeId == selectedHomeType
      );
    }

    // Filter by bed number
    if (selectedBedNumber !== "") {
      filteredHomesResult = filteredHomesResult.filter(
        (h) => h.bedNumber >= parseInt(selectedBedNumber)
      );
    }

    // Filter by price
    if (minPrice !== "") {
      filteredHomesResult = filteredHomesResult.filter(
        (h) => h.price >= parseInt(minPrice)
      );
    }

    if (maxPrice !== "") {
      filteredHomesResult = filteredHomesResult.filter(
        (h) => h.price <= parseInt(maxPrice)
      );
    }

    // final filtered state
    setFilteredHomes(filteredHomesResult);
  }, [
    searchTerm,
    homes,
    selectedHomeType,
    selectedBedNumber,
    minPrice,
    maxPrice,
  ]);

  // clears all filter inputs and resets to original state
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedHomeType("");
    setSelectedBedNumber("");
    setMinPrice("");
    setMaxPrice("");
    setFilteredHomes(homes);
  };

  // handles the user save and user unsave
  const toggleUserSave = async (event, home) => {
    event.preventDefault();

    // find if user has saved home already
    const userSavedHome = home.userSaves.find(
      (save) => save.userProfileId === loggedInUser.id
    );

    if (userSavedHome) {
      // if home is saved, show removed message
      setAlertMessage("Home has been removed from your saved properties.");
      setAlertVisible(true);
        // remove the user save from UserSaves table
      await removeUserSave(home.id, loggedInUser.id);
      const updatedHomes = getHomes();
      // set state
      getData(updatedHomes);

    } else {
      // if home is not saved, show added to saves message with link
      setAlertMessage(
        <div>
          Home has been added to your saved properties. View all your saves
          <Link to="/usersaves"> here</Link>.
        </div>
      );
      setAlertVisible(true);
        // add new user save to UserSaves table 
      const newSave = await createUserSave(home.id, loggedInUser.id);
        // spread operator to add new user save to array
      const updatedHomes = homes.map((h) =>
        h.id === home.id ? { ...h, userSaves: [...h.userSaves, newSave] } : h
      );
      // set state
      getData(updatedHomes);
    }

    // hide alert after 4 seconds
    setTimeout(() => {
      setAlertVisible(false);
      setAlertMessage("");
    }, 4000);
  };

  // Make sure that the p tag for results only counts the length of not unsold homes
  const unsoldHomes = filteredHomes.filter(home => !home.sold);

  return (
    <div className="container mt-4">
      <div>
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
            flexDirection: "column",
          }}
        >
          <h4> <FontAwesomeIcon icon={faSignHanging} /> Properties For Sale</h4>
          <p>{unsoldHomes.length} results</p>
        </div>
      </div>
        {/* Filter bar with props for FilterBar.js */}
      <HomeFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        homeTypes={homeTypes}
        selectedHomeType={selectedHomeType}
        setSelectedHomeType={setSelectedHomeType}
        selectedBedNumber={selectedBedNumber}
        setSelectedBedNumber={setSelectedBedNumber}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        clearFilters={clearFilters}
      />
      <div className="d-flex flex-wrap">
        {filteredHomes
          .filter((h) => h.userProfileId === null)
          .map((home) => (
            <Card
              key={`home-${home.id}`}
              style={{ width: "20rem", margin: "2px", marginBottom: "15px" }}
              className="hover-card"
            >
              <Link to={`${home.id}`}>
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
                <div
                  style={{
                    color: "white",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 1,
                  }}
                  onClick={(event) => toggleUserSave(event, home)}
                >
                  <FontAwesomeIcon
                    icon={
                      home.userSaves &&
                      !home.userSaves.some(
                        (save) => save.userProfileId === loggedInUser.id
                      )
                        ? outlineHeart
                        : solidHeart
                    }
                    size="2x"
                  />
                </div>
                <>
                {/* Badge for homes listed in the last day */}
                  {home.sold === false &&
                    home.listedOn &&
                    new Date(home.listedOn) >
                      new Date(
                        new Date().setDate(new Date().getDate() - 1)
                      ) && <Badge 
                      
                      color="primary">Recently Added!</Badge>}
                </>
              </Link>
              <CardBody>
                <CardText style={{ marginBottom: "4px" }}>
                  <strong>${home.price.toLocaleString("en-US")}</strong> -{" "}
                  <small>{home.homeType.homeTypeName} for sale</small>
                  <br />
                  <strong>{home.bedNumber}</strong> bds |{" "}
                  <strong>{home.bathNumber}</strong> ba |{" "}
                  <strong>{home.squareFeet}</strong> sqft
                  <br />
                  <FontAwesomeIcon icon={faLocationDot} /> {home.streetAddress},{" "}
                  {home.city}, TN
                </CardText>
                <br />
              </CardBody>
            </Card>
          ))}
      </div>
      {/* Alert for when user saves and unsaves a home */}
      <Alert
        style={{
          position: "fixed",
          top: "4%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        color="primary"
        isOpen={alertVisible}
        toggle={() => setAlertVisible(false)}
      >
        {/* Alert message is conditiionally rendered depending on the usersaves */}
        {alertMessage}
      </Alert>
    </div>
  );
}
