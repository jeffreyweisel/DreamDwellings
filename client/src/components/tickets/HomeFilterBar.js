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
            -{/* Maximum Price Input */}
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
                <FontAwesomeIcon icon={faCircleXmark} /> Reset
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
