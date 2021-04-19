import { useState, useEffect } from "react";
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
import "./SignIn.css";
import firebase from "firebase";
import { Link, useHistory } from "react-router-dom";
const SignIn = () => {
  //Non-State Properties
  const history = useHistory();

  //State Properties
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState([]);

  //Methods
  const onHandleSubmit = (e) => {
    e.preventDefault();
    console.info("Signin form submit");
    const errorsArray = [];
    setErrors([]);
    if (
      email === "" ||
      email === null ||
      email.includes("@") === false ||
      email.includes(".") === false
    ) {
      errorsArray.push("Email is invalid.");
    }

    if (password === "" || password == null || password.length < 6) {
      errorsArray.push("Password is invalid or less than 6 characters");
    }

    if (errorsArray.length > 0) {
      setErrors(errorsArray);
    }

    console.info("No errors");
    signInAuthFirebase();
  };

  const signInAuthFirebase = async () => {
    try {
      const userResult = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      if (userResult) {
        console.info("Signin result", userResult.user.uid);
        const userDetails = (
          await firebase
            .firestore()
            .collection("users")
            .doc(userResult.user.uid)
            .get()
        ).data();
        if (userDetails) {
          setUser(userDetails);
        }
      }
    } catch (error) {
      console.info("Error:", error);
    }
  };

  const renderErrors = errors.map((error, index) => {
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

  //Effect methods
  useEffect(() => {
    console.info("SignIn Component was mounted");
  }, []);

  useEffect(() => {
    console.info("User has been set::", user);
    if (user) {
      localStorage.setItem("userDetails", JSON.stringify(user));
      if (user) {
        history.push("/firestore");
      }
    }
  }, [user,history]);
  return (
    <div>
      <h1>SignIn</h1>
      <Container>
        <Row>
          <Col md="4"></Col>
          <Col md="4">
            <Form onSubmit={(e) => onHandleSubmit(e)}>
              <FormGroup>
                <Label className="fieldLabel" for="email">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label className="fieldLabel" for="password">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </FormGroup>

              <Button outline type="submit" color="primary">
                SignIn
              </Button>

              <br />

              <p>
                Don't have an account? <Link to="/signUp">SignUp</Link>
              </p>
            </Form>
          </Col>
          <Col md="4"></Col>
        </Row>

        {/*Errors here*/}

        {errors.length > 0 && (
          <div>
            <br />
            {renderErrors}
          </div>
        )}
      </Container>
    </div>
  );
};

export default SignIn;
