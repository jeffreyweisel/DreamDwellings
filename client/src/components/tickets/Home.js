import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import HouseImg from '../../assets/houseimg.png'

export default function Home() {

  const navigate = useNavigate();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "800px",
    width: "800px",
  };

  const bannerStyle = {
    backgroundImage: `url(${HouseImg})`,
    backgroundSize: "cover",
    color: "black",
    height: "300px",
    width: "600px",
  };

  const handleButtonClick = () => {
    navigate("/homes");
  };

  return (
    <Container className="d-flex mt-5" style={containerStyle}>
      <div style={bannerStyle}></div>
      <div>
        <h1>Welcome to Dream Dwellings</h1>
        <p>Your dream home awaits you.</p>
      </div>
      <div className="mt-5">
        <Button onClick={handleButtonClick} color="primary">
          Get Started <FontAwesomeIcon icon={faCircleArrowRight} />
        </Button>
      </div>
    </Container>
  );
}

