import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { useAuth } from "../components/AuthContext.jsx";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/v1/auth/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: username, password }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                login(username);
                navigate('/');
            } else {
                throw new Error('Authentication failed. Please check your credentials.');
            }
        } catch (error) {
            setErrorMessage(error.message);
            console.error(error);
        }
    };


    return (
        <Container fluid style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Row className="justify-content-center align-items-center">
                <Col md={4} style={{ marginTop: '15vh' }}>
                    <Alert variant="danger" show={errorMessage !== ''} onClose={() => setErrorMessage('')} dismissible>
                        {errorMessage}
                    </Alert>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Log In
                        </Button>
                        <p className="mt-3 text-center">
                            Don't have an account?{' '}
                            <Link to={`/registration`} style={{ color: '#007BFF', textDecoration: 'none' }}>
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
