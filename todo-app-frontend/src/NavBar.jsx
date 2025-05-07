import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from 'react-bootstrap';

function NavBar() {
  const { isLoggedIn, user,logout } = useAuth()
  const [email,setEmail] = useState(null)
  useEffect(() => {
      if(isLoggedIn){
        setEmail(user.email)
      }
  }, []);
  
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
                <div>
                    <span>Welcome, {user?.username}</span>
                    <Button onClick={logout}>Logout</Button>
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