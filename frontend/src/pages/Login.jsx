import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', {
                email: email,
                password: password,
            });
            console.log(response.data);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred while logging in.');
            }
        }
    };

    return (
        <Container fluid style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Row className="justify-content-center align-items-center">
                <Col md={4} style={{marginTop: '15vh'}}>
                    <Alert variant="danger" show={errorMessage !== ''} onClose={() => setErrorMessage('')} dismissible>
                        {errorMessage}
                    </Alert>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Log In
                        </Button>
                        <p className="mt-3 text-center">
                            Don't have an account?{' '}
                            <Link to={`/registration`} style={{color: '#007BFF', textDecoration: 'none'}}>
                                Register
                            </Link>
                        </p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
