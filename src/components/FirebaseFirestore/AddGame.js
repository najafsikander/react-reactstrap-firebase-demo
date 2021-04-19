import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import { useState } from "react";
import firebase from "../../Firebase/firebase";
import "./Firestore.css";
const AddGame = () => {
  //State Properties
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [launchDate, setLaunchDate] = useState("");
  const [errors, setErrors] = useState([]);

  //Helper Methods
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const errorArray = [];

    if (name === "" || name === null || name.length < 6) {
      errorArray.push("Name is invalid or less than 6 characters");
    }

    if (description === "" || description === null || description.length < 15) {
      errorArray.push("Description is invalid or less than 15 characters");
    }

    if (image === null || image === undefined) {
      errorArray.push("Image is required.");
    }

    if (launchDate === null || launchDate === "")
    {
      errorArray.push("Enter launch date");
    }

    if (errorArray.length > 0) {
      setErrors(errorArray);
      return "Errors in validations";
    }

    console.info("no errors", launchDate);

    addGameToDB();
  };

  const addGameToDB = async () => {
    try {
      const data = {
        name: name,
        description: description,
        launchDate: launchDate
      };
      const document = await firebase.firestore().collection("games").add(data);

      if (document) {
        console.info("Document: ", document);
        await document.update({
          id: document.id,
        });

        const imageUrl = await uploadImage();

        if (imageUrl !== "") {
          await document.update({
            imageUrl: imageUrl
          });
        }
      }
    } catch (error) {
      console.error("Error caught while adding game: ", error);
    }
  };

  const uploadImage = async () => {
    let imageUrl = "";
    const storage = firebase.storage();
    const storageRef = storage.ref();

    const imageRef = storageRef.child(`images/games`);

    const gameImageRef = imageRef.child(`${image.name}`);

    const uploadTask = await gameImageRef.put(image);

    if (uploadTask && uploadTask.state === "success") {
      console.info("Image has been uploaded:::", uploadTask);
      imageUrl = await uploadTask.task.snapshot.ref.getDownloadURL();
      console.info("URL::", imageUrl);
    } else {
      console.info("Image upload failed");
    }

    return imageUrl;
  };

  const handleFile = (e) => {
    setImage(null);
    const files = e.target.files;
    console.info("Files::", files);
    setImage(files[0]);
  };

  const displayErrors = errors.map((error, index) => {
    return (
      <Container>
        <Row>
          <Col md="3"></Col>
          <Col md="6">
            <Alert key={index} color="danger">
              {error}
            </Alert>
          </Col>
          <Col md="3"></Col>
        </Row>
      </Container>
    );
  });
  //Component ui return method
  return (
    <div>
      <h1>Add Game</h1>

      <Container>
        <Row>
          <Col md="12">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="name" className="fieldLabel">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description" className="fieldLabel">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  type="textarea"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleDate" className="fieldLabel">Launch Date</Label>
                <Input
                  type="date"
                  name="launchDate"
                  id="launchDate"
                  value={launchDate}
                  onChange={(e) => {setLaunchDate(e.target.value)}}
                  placeholder="date placeholder"
                />
              </FormGroup>
              <FormGroup>
                <Label for="imageURl" className="fieldLabel">
                  File
                </Label>
                <Input
                  type="file"
                  name="imageURL"
                  id="imageURL"
                  onChange={(e) => {
                    handleFile(e);
                  }}
                />
              </FormGroup>
              <Button outline type="submit" color="primary">
                Add Game
              </Button>{" "}
            </Form>
            {errors.length > 0 && <div className="errors">{displayErrors}</div>}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddGame;
