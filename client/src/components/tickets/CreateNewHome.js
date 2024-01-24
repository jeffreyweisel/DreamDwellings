import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom/dist";
import { addHome } from "../../DataManagers/homeManager";

export default function CreateNewHomeForm() {
  const navigate = useNavigate();


  const [homeImage, setHomeImage] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [squarefeet, setSquareFeet] = useState("");
  const [bedNumber, setBedNumber] = useState("");
  const [bathNumber, setBathNumber] = useState("");
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [homeTypeId, setHomeTypeId] = useState("")
  
  
  

  const submit = () => {
    const newHome = {
      homeImage,
      city,
      squarefeet,
      streetAddress,
      bedNumber,
      bathNumber,
      description,
      price,
      homeTypeId
    };

    addHome(newHome).then(() => {
        console.log(newHome)
      navigate("/homes");
    });
  };

  return (
    <div className="container">
      <h4>Add New Home Listing!</h4>
      <Form>
        <FormGroup>
          <Label htmlFor="homeImage">Home Image URL:</Label>
          <Input
            type="text"
            placeholder="...."
            name="homeImage"
            value={homeImage}
            onChange={(e) => {
              setHomeImage(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="streetAddress">Street Address:</Label>
          <Input
            type="text"
            placeholder="...."
            name="streetAddress"
            value={streetAddress}
            onChange={(e) => {
              setStreetAddress(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="city">City:</Label>
          <Input
            type="text"
            placeholder="...."
            name="city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="sqaureFeeet">Square Feet:</Label>
          <Input
            type="text"
            placeholder="...."
            name="squareFeet"
            value={squarefeet}
            onChange={(e) => {
              setSquareFeet(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="bedNumber">Beds:</Label>
          <Input
            type="text"
            placeholder="...."
            name="bedNumber"
            value={bedNumber}
            onChange={(e) => {
              setBedNumber(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="bathNumber">Baths:</Label>
          <Input
            type="text"
            placeholder="...."
            name="bathNumber"
            value={bathNumber}
            onChange={(e) => {
              setBathNumber(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description:</Label>
          <Input
            type="text"
            placeholder="...."
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="price">Price:</Label>
          <Input
            type="text"
            placeholder="...."
            name="price"
            value={price}
            onChange={(e) => {
              setPrice(parseInt(e.target.value));
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="homeTypeId">Home Type:</Label>
          <Input
            type="text"
            placeholder="...."
            name="homeTypeId"
            value={homeTypeId}
            onChange={(e) => {
              setHomeTypeId(parseInt(e.target.value));
            }}
          />
        </FormGroup>
        <Button onClick={submit}>Submit</Button>
      </Form>
    </div>
  );
}