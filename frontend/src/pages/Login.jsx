import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Carousel from 'react-bootstrap/Carousel';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [advantageIndex, setAdvantageIndex] = useState(0);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            name: username, password: password,
        };
        localStorage.setItem('token', 'dummyToken');
        localStorage.setItem('username', username);
        setToken('dummyToken');
        setIsLoggedIn(true);
        navigate('/mainpage');
    };

    return (<Container fluid style={{backgroundColor: '#f5f5f5', minHeight: '100vh'}}>
            <div style={{width: '40%', marginLeft: '50px'}}>
            </div>

            <div style={{width: '60%', marginLeft: '100px'}}>
                <Alert variant="danger" show={!isLoggedIn} onClose={() => setIsLoggedIn(true)} dismissible>
                    Authentication failed. Please check your credentials.
                </Alert>

                {isLoggedIn ? null : (
                    <Form onSubmit={handleLogin} style={{maxWidth: '500px', margin: 'auto', marginTop: '50px'}}>
                        <h2 className="text-center mb-4" style={{color: '#333'}}>
                            Login
                        </h2>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                                          required/>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                          required/>
                        </Form.Group>

                        <Button type="submit" variant="primary" className="mt-3" style={{backgroundColor: '#007BFF'}}>
                            Login
                        </Button>

                        <p className="mt-3 text-center">
                            Don't have an account?{' '}
                            <Link to={`/registration`} style={{color: '#007BFF', textDecoration: 'none'}}>
                                Register
                            </Link>
                        </p>
                    </Form>)}
            </div>
        </Container>);
}

export default Login;
