
import {useState, useEffect} from 'react';
import {Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert} from 'reactstrap';
import firebase from '../../../Firebase/firebase';
import  './SignUp.css'
import {Link} from 'react-router-dom';
const SignUp = () => {

    // State Declaration
    const [user, setUser] = useState(null);

    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState([]);

    const [showLink, setShowLink] = useState(false);
    //Component Methods

    const onSubmitSignUpForm = (e) => {
        e.preventDefault();
        const errorArray = [];
        setErrors([]);
        console.info('submitting form');

        console.info('Form Data::', [
            name, email, age, country, city, password, confirmPassword
        ]);

        if(name === '' || name === null || name.length < 6)
        {
            errorArray.push('Name is invalid or less than 6 characters')
        }

        if(email === '' || email  === null || email.includes('@') === false || email.includes('.') === false)
        {
            errorArray.push('Email is invalid or empty');
        }

        if(age === 0) {
            errorArray.push('Age is invalid');
        }

        if(country === '' || country === null) {
            errorArray.push('Country is invalid');
        }

        if(city === '' || city === null) {
            errorArray.push('City is invalid');
        }

        if(password === '' || password == null || password.length < 6)
        {
            errorArray.push('Password is invalid or less than 6 characters');
        }
        
        if(confirmPassword === '' || confirmPassword == null || confirmPassword.length < 6) {
            errorArray.push('Confirm password is invalid or less than 6 characters');
        }

        if(confirmPassword !== password) {
            errorArray.push('Passwords donot match');
        }

        if(errorArray.length > 0)
        {
            setErrors(errorArray);
            return 'Errors in validations';
        }

        console.info('no errors');
        createUserByFBAuth(email, password);
    }

    const createUserByFBAuth = async (email, password) => {
        try {
            console.info('CREATE USER');
            setUser(null);
            setErrors([]);
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
            if(user) {
               console.info('Signed Up User::', user.user.uid);
               setUser(user.user);
               firebase.firestore().collection('users').doc(user.user.uid).set({
                id: user.user.uid,
                name: name,
                email: email,
                age: age,
                country: country,
                city: city
               }).then((userDoc) => {
                console.info('User details were saved after signing up');
                setShowLink(true);
               }).catch((docError) => {
                console.error('Error while adding user doc after auth::', docError);
               });
           }
        } catch (error) {
            console.error('Caught error while signing up:::', error);
            if(error.code === 'auth/email-already-in-use') {
                setErrors(['The email address is already in use by another account.']);
            }
        }
    }

    const renderFetchedError = errors.map((error, index) => {
        return <Container>
            <Row>
                <Col md="3">
                </Col>
                <Col md="6">
                <Alert key={index} color="danger">
                    {error}
                </Alert>
                </Col>
                <Col md="3">
                </Col>
            </Row>
        </Container>;
    });

    //Effects Methods
    useEffect(()=> {
        console.info('New user was signed up');
    }, [user])

    return(
        <div>
            <h1>Sign Up</h1>
            <div>
                <Container>
                <Row>
                    <Col md="4"></Col>
                    <Col md="4">
                        <Form onSubmit={onSubmitSignUpForm}>
                            <FormGroup>
                                <Label className="fieldLabel" for="name">Name</Label>
                                <Input id="name" type="text" name="name" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Enter your full name"/>
                            </FormGroup>
                            <FormGroup>
                                <Label className="fieldLabel" for="email">Email</Label>
                                <Input id="email" type="email" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter your email"/>
                            </FormGroup>
                            <FormGroup>
                                <Label className="fieldLabel" for="age">Age</Label>
                                <Input id="age" type="number" name="age" value={age} onChange={(e) => {setAge(+e.target.value)}} placeholder="Enter your age"/>
                            </FormGroup>
                            <FormGroup>
                                <Label className="fieldLabel" for="country">Country</Label>
                                <Input id="country" type="text" name="country" value={country} onChange={(e) => {setCountry(e.target.value)}} placeholder="Enter your country"/>
                            </FormGroup>
                            <FormGroup>
                                <Label className="fieldLabel" for="city">City</Label>
                                <Input id="city" type="text" name="city" value={city} onChange={(e) => {setCity(e.target.value)}} placeholder="Enter your city"/>
                            </FormGroup>
                            <FormGroup>
                                <Label className="fieldLabel" for="password">Password</Label>
                                <Input id="password" type="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter your password"/>
                            </FormGroup>
                            <FormGroup>
                                <Label className="fieldLabel" for="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} placeholder="Confirm your password"/>
                            </FormGroup>
                            <Button outline type="submit" color="primary">Create User</Button>{' '}
                            <br/>
                            <p>Already have an account? <Link to="/signIn">SignIn</Link></p>
                        </Form>
                    </Col>
                    <Col md="4"></Col>
                </Row>
                </Container>
                    {/* Conditionally redering redirect link */}
                    {
                        showLink === true && 
                        <p>Successfully registered user! <Link to="/signIn">Sign In?</Link></p>
                    }

                    <br/>

                    {/* Conditionally rendering errors */}
                        {
                            errors.length > 0 &&
                            <div>
                                {renderFetchedError}
                            </div>
                        }
            </div>
            
        </div>
    );
}

export default SignUp;