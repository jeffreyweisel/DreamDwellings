import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom/dist";
import { addHome } from "../../DataManagers/homeManager";
import { getHomeTypes } from "../../DataManagers/homeTypeManager";

export default function CreateNewHomeForm() {
  const navigate = useNavigate();

  const [homeTypes, setHomeTypes] = useState([]);

  const [homeImage, setHomeImage] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [squarefeet, setSquareFeet] = useState("");
  const [bedNumber, setBedNumber] = useState("");
  const [bathNumber, setBathNumber] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [homeTypeId, setHomeTypeId] = useState("");

  useEffect(() => {
    getHomeTypes().then(setHomeTypes);
    console.log(homeTypes);
  }, []);

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
      homeTypeId,
    };

    addHome(newHome).then(() => {
      console.log(newHome);
      navigate("/homes");
    });
  };

  return (
    <div className="container">
      <h4 className="mb-4">Add New Home Listing!</h4>
      <Form className="d-flex flex-wrap">
        <FormGroup>
          <Label htmlFor="homeImage">Image:</Label>
          <Input
            type="text"
            name="homeImage"
            value={homeImage}
            onChange={(e) => {
              setHomeImage(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup className="mr-4 flex-grow-1">
          <Label htmlFor="streetAddress">Street Address:</Label>
          <Input
            type="text"
            name="streetAddress"
            value={streetAddress}
            onChange={(e) => {
              setStreetAddress(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup className="mr-4 flex-grow-1">
          <Label htmlFor="city">City:</Label>
          <Input
            type="text"
            name="city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup className="mr-4 flex-grow-1">
          <Label htmlFor="sqaureFeeet">Square Feet:</Label>
          <Input
            type="text"
            name="squareFeet"
            value={squarefeet}
            onChange={(e) => {
              setSquareFeet(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup className="mr-4 flex-grow-1">
          <Label htmlFor="bedNumber">Beds:</Label>
          <Input
            type="text"
            name="bedNumber"
            value={bedNumber}
            onChange={(e) => {
              setBedNumber(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup className="mr-4 flex-grow-1">
          <Label htmlFor="bathNumber">Baths:</Label>
          <Input
            type="text"
            name="bathNumber"
            value={bathNumber}
            onChange={(e) => {
              setBathNumber(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup className="mr-4 flex-grow-1">
          <Label htmlFor="description">Description:</Label>
          <Input
            type="text"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup className="mr-4 flex-grow-1">
          <Label htmlFor="price">Price:</Label>
          <Input
            type="number"
            name="price"
            value={price}
            onChange={(e) => {
              setPrice(parseInt(e.target.value));
            }}
          />
        </FormGroup>
        <FormGroup className="mr-4 flex-grow-1">
          <Label htmlFor="homeTypeId">Type of Home</Label>
          <Input
            type="select"
            name="homeTypeId"
            value={homeTypeId}
            onChange={(e) => {
              setHomeTypeId(parseInt(e.target.value));
            }}
          >
            <option value="0"></option>
            {homeTypes.map((ht) => (
              <option value={ht.id}>{ht.homeTypeName}</option>
            ))}
          </Input>
        </FormGroup>
      </Form>
      <Button color="primary" className="mr-4" onClick={submit}>
        Submit
      </Button>
    </div>
  );
}
