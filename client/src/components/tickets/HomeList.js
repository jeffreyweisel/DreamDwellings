import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardText,
  CardImg
} from "reactstrap";
import { Link } from "react-router-dom";
import { getHomes } from "../../DataManagers/homeManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getHomeTypes } from "../../DataManagers/homeTypeManager";
import HomeFilterBar from "./HomeFilterBar";

export default function HomeList() {
  const [homes, setHomes] = useState([]);
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHomeType, setSelectedHomeType] = useState("");
  const [homeTypes, setHomeTypes] = useState([]);
  const [selectedBedNumber, setSelectedBedNumber] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // On render state
  useEffect(() => {
    getHomes().then((hArray) => {
      setHomes(hArray);
      setFilteredHomes(hArray);
    });
    getHomeTypes().then(setHomeTypes);
    console.log(homes);
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

  // Clears all filter inputs and resets to original state
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedHomeType("");
    setSelectedBedNumber("");
    setMinPrice("");
    setMaxPrice("");
    setFilteredHomes(homes);
  };

  return (
    <div className="container mt-4">
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
    </div>
  );
}
