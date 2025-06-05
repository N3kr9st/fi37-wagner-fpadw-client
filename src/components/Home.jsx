import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

function Home({ isName, isLoggedIn }) {
  const name = localStorage.getItem('username');
 useEffect(() => {
    async function callServer() {
        try {
            const response = await fetch(`http://api-test.mshome.net:3001`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Fehler beim Login:", error);
        }
    }
    callServer();

}, []);

  return (
    <>
      {isLoggedIn ? (
        <h1>{name}, willkommen auf unserer Website!</h1>
      ) : (
        <Link to="/login">Bitte loggen Sie sich ein</Link>
      )}
      <p>Wir freuen uns, Sie hier begrüßen zu dürfen.</p>
    </>
  );
}

export default Home;