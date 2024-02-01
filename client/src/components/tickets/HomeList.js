import { useEffect, useState } from "react";
import { Card, CardBody, CardText, CardImg, Alert, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import {
  createUserSave,
  getHomes,
  removeUserSave,
} from "../../DataManagers/homeManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faTemperatureDown,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";
import { getHomeTypes } from "../../DataManagers/homeTypeManager";
import HomeFilterBar from "./HomeFilterBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeImageCarousel from "./HomeImageCarousel";

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

    // Filter by Home Type via dropdown
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

    const userSavedHome = home.userSaves.find(
      (save) => save.userProfileId === loggedInUser.id
    );

    if (userSavedHome) {
      // If saved, show remove message
      setAlertMessage("Home has been removed from your saved properties.");
      setAlertVisible(true);
      await removeUserSave(home.id, loggedInUser.id);
      const updatedHomes = getHomes();
      getData(updatedHomes);
    } else {
      // If not saved, show add message
      setAlertMessage(
        "Home has been added to your saved properties. You can now view it there."
      );
      setAlertVisible(true);
      const newSave = await createUserSave(home.id, loggedInUser.id);
      const updatedHomes = homes.map((h) =>
        h.id === home.id ? { ...h, userSaves: [...h.userSaves, newSave] } : h
      );
      getData(updatedHomes);
    }

    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlertVisible(false);
      setAlertMessage("");
    }, 4000);
  };

  return (
    <div className="container mt-4">
      {/* <HomeImageCarousel 
      /> */}
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
              style={{ width: "20rem", margin: "2px" }}
            >
              <Link to={`${home.id}`}>
                <CardImg
                  style={{ objectFit: "cover", height: "200px" }}
                  variant="top"
                  src={home.homeImage}
                  alt="homeimg"
                />
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
                  {home.sold === false && home.listedOn &&
                    new Date(home.listedOn) > new Date(new Date().setDate(new Date().getDate() - 1)) && (
                      <Badge
                      color="primary">Recently Added!</Badge>
                    )}
                </>
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
                  <FontAwesomeIcon icon={faLocationDot} /> {home.streetAddress},{" "}
                  {home.city}, TN
                </CardText>
                <br />
              </CardBody>
            </Card>
          ))}
      </div>
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
        {alertMessage}
      </Alert>
    </div>
  );
}
