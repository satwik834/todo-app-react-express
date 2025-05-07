import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    setError(null)
    setLoading(true)
    try{
        await login(email, password)
        navigate('/')
    }catch(err){
        console.log(err.message)
        setError(err.error)
    }
    
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '22rem' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>
          <Form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>{loading ? 'Logging In...' : 'Login'}</Button>
          </Form>

          <div className="text-center mt-3">
            <small>Don't have an account? <Link to="/register">Register</Link></small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
