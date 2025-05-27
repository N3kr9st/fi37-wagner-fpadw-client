import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

function Home({ isName, isLoggedIn }) {
  
 useEffect(() => {
    async function callServer() {
        try {
            const response = await fetch(`https://user-api.mshome.net`);
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
        <h1>{isName}, willkommen auf unserer Website!</h1>
      ) : (
        <Link to="/login">Bitte loggen Sie sich ein</Link>
      )}
      <p>Wir freuen uns, Sie hier begrüßen zu dürfen.</p>
    </>
  );
}

export default Home;