import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css'

import Home from './components/Home';
import UserTest from './components/user-test';
import Recipe from './components/Recipe';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isName, setName] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      // Prüfen, ob ein Token und userId im Local Storage vorhanden ist
      const token = localStorage.getItem('token');
      const storedUserId = localStorage.getItem('userId');

      if (token && storedUserId) {
          setIsLoggedIn(true);
          setUserId(storedUserId);
      }
  }, [navigate]);

  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setIsLoggedIn(false);
      navigate('/Login');
  };


  const handleToggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    
  };


  return (
<>
 
    
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container>
          <Navbar.Brand as={Link} to="/home">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" activeKey={location.pathname}>
              <Nav.Link as={Link} to="/Home">Home</Nav.Link>
              <Nav.Link as={Link} to="/User-Test">User-Test</Nav.Link>
              <Nav.Link as={Link} to="/Recipe">Rezepte</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="app">
        <main>
          <Routes>
            <Route path="/home" element={<Home isName={isName} isLoggedIn={isLoggedIn} />} />
            <Route path="/User-Test" element={<UserTest />} />
            <Route path="/Recipe" element={<Recipe />} />
              
          </Routes>
        </main>
      </div>
</>
  );
}

export default App;