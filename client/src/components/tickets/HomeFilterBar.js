import React from "react";
import { Row, Col, Input, FormGroup, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function HomeFilterBar({
  searchTerm,
  setSearchTerm,
  homeTypes,
  selectedHomeType,
  setSelectedHomeType,
  selectedBedNumber,
  setSelectedBedNumber,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  clearFilters,
}) {
  return (
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
            <FormGroup>
              <Input
                type="select"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
              >
              <option value="">Min Price</option>
              <option value="100000">100,000</option>
              <option value="200000">200,000</option>
              <option value="300000">300,000</option>
              <option value="400000">400,000</option>
              <option value="500000">500,000</option>
              <option value="600000">600,000</option>
              <option value="700000">700,000</option>
              <option value="800000">800,000</option>
              <option value="900000">900,000</option>
              </Input>
              </FormGroup>
            </Col> -
            {/* Maximum Price Input */}
            <Col>
            <FormGroup>
              <Input
                type="select"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
              >
              <option value="">Max Price</option>
              <option value="200000">200,000</option>
              <option value="300000">300,000</option>
              <option value="400000">400,000</option>
              <option value="500000">500,000</option>
              <option value="600000">600,000</option>
              <option value="700000">700,000</option>
              <option value="800000">800,000</option>
              <option value="900000">900,000</option>
              <option value="1000000">1,000,000</option>
              </Input>
              </FormGroup>
            </Col>
            {/* Clear filters button */}
            <Col>
               <Button
               color="primary"
               onClick={clearFilters}
               >
                <FontAwesomeIcon icon={faCircleXmark} /> Reset
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}