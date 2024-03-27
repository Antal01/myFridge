import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (password === passwordConfirm) {
            try {
                const response = await axios.post('/api/register', {
                    userName: username,
                    email: email,
                    password: password,
                }, {
                    mode: 'no-cors', // Set mode to 'no-cors'
                });
                console.log(response.data);
                navigate('/');
            }  catch (error) {
                if (error.response && error.response.data) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('An error occurred while registering.');
                }
            }
        } else {
            setErrorMessage('Passwords do not match. Please make sure the passwords match.');
        }
    };

    return (
        <Container fluid style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Row className="justify-content-center align-items-center">
                <Col md={4} style={{marginTop: '15vh'}}>
                    <Alert variant="danger" show={errorMessage !== ''} onClose={() => setErrorMessage('')} dismissible>
                        {errorMessage}
                    </Alert>
                    <Form onSubmit={handleRegistration}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                                          required/>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                          required/>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                          required/>
                        </Form.Group>

                        <Form.Group controlId="passwordConfirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" value={passwordConfirm}
                                          onChange={(e) => setPasswordConfirm(e.target.value)} required/>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Register
                        </Button>
                    </Form>
                    <p className="mt-3 text-center">
                        Already have an account?{' '}
                        <Link to={`/login`} style={{color: '#007BFF', textDecoration: 'none'}}>
                            Log In
                        </Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Registration;
