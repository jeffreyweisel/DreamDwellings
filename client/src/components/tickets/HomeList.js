import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardText,
  CardImg,
  Button,
  Row,
  Col,
  Input,
  FormGroup
} from "reactstrap";
import { Link } from "react-router-dom";
import { getHomes } from "../../DataManagers/homeManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getHomeTypes } from "../../DataManagers/homeTypeManager";

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
      {/* Search Bar */}
      <div
        className="filter-bar"
        style={{ padding: "10px", marginBottom: "5px" }}
      >
        <Row>
          <Col md="3" className="home-search">
            <div className="search-wrapper">
              <Input
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
                type="text"
                placeholder="City Search"
                className="player-input"
                value={searchTerm}
              />
            </div>
          </Col>
          {/* Home Type Dropdown */}
          <Col md="3" className="home-search">
            <FormGroup>
              <Input
                type="select"
                id="homeTypeSelect"
                onChange={(event) => {
                  setSelectedHomeType(event.target.value);
                }}
                value={selectedHomeType}
                className="player-select"
              >
                <option value="">Home Type</option>
                {homeTypes.map((ht) => (
                  <option key={ht.id} value={ht.id}>
                    {ht.homeTypeName}
                  </option>
                ))}
              </Input>
            </FormGroup>
            {/* Bedroom number dropdown */}
          </Col>
          <Col md="2" className="home-search">
            <FormGroup>
              <Input
                type="select"
                id="bedNumberSelect"
                onChange={(event) => {
                  setSelectedBedNumber(event.target.value);
                }}
                value={selectedBedNumber}
                className="player-select"
              >
                <option value="">Bedrooms</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </Input>
            </FormGroup>
          </Col>
          {/* Minimum Price Input */}
          <Col md="4" className="home-search">
            <Row>
              <Col>
                <Input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                />
              </Col>
              -
              {/* Maximum Price Input */}
              <Col>
                <Input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                />
              </Col>
              {/* Clear filters button */}
              <Col>
                <Button color="primary" onClick={clearFilters}>
                  <FontAwesomeIcon icon={faCircleXmark} /> Clear
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
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
