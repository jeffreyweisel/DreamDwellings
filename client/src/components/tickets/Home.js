import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";

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
    backgroundImage:
      'url("https://images.rawpixel.com/image_png_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV80X3Bob3RvX29mX2FfbW9kZXJuX2FyY2hpdGVjdHVyZV9idWlsZGluZ19pc29sYV84ODEwZmEwMS1hOTdhLTQ0MGQtYmUzNC1mMzEyZmMwN2Q0MTJfMS5wbmc.png")',
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
