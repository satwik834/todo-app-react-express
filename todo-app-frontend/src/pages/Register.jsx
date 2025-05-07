import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Link,useNavigate} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {register} = useAuth();
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async e => {
    e.preventDefault();
    try {
        setError(null)
        setLoading(true)
        await register(form.username, form.email, form.password);
        navigate('/');
    } catch(err) {
        console.error('Registration error:', err);
        setError(err.error)
    }
};

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '24rem' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Register</Card.Title>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                name="username" 
                placeholder="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                name="password" 
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button  variant="success" type="submit" className="w-100" disabled={loading}>{loading ? 'Registering...' : 'Register'}</Button>
          </Form>

          <div className="text-center mt-3">
            <small>Already have an account? <Link to="/login">Login</Link></small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
