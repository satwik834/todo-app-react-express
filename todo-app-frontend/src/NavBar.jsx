import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Alert } from 'react-bootstrap';

function NavBar() {
  const { isLoggedIn, user, logout } = useAuth()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="w-75 nav-bar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className='nav-bar-brand'>Todo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className='nav-bar-home'>Home</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn?(
                <div className='d-flex align-items-center'>
                    {error && <Alert variant="danger" className="me-2 mb-0 py-1">{error}</Alert>}
                    <span className='text-light me-3'>Welcome, {user?.email}</span>
                    <Button 
                      variant='outline-light' 
                      onClick={async () => {
                        setError(null);
                        setLoading(true);
                        try {
                          await logout();
                        } catch (err) {
                          setError(err.error || 'Logout failed');
                        } finally { setLoading(false); } }}
                      disabled={loading}>
                      {loading ? 'Logging out...' : 'Logout'}
                    </Button>
                </div>

            ) :(
              <Nav.Link as={Link} to="/login" className='nav-bar-login'>Login</Nav.Link>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;