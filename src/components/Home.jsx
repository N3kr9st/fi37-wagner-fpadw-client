import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

function Home({ isName, isLoggedIn }) {
    function capitalizeFirstLetter(text) {
      if (!text) return '';
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  const name =capitalizeFirstLetter(localStorage.getItem('username'));

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
        <h1>Hallo {name}, <br />willkommen im internen Kochbuch!</h1>
      ) : (
        <Link to="/login">Bitte loggen Sie sich ein</Link>
      )}
      <br />
      <p>Hier können Sie Ihre Rezepte erstellen, bearbeiten und löschen.</p>
      <p>Sie können auch Rezepte von anderen Benutzern kommentieren.</p>
      <p>Die Rezepte werden in einer Datenbank gespeichert und sind für alle Benutzer sichtbar.</p>
      <p>Die Rezepte können Bilder enthalten, die Sie beim Erstellen des Rezepts hochladen können.</p>
      <p>Die Rezepte können auch Zutatenlisten und Zubereitungsschritte enthalten.</p>
      <p>Viel Spaß</p>
      <p><img src='http://api-test.mshome.net:3001/default_Image/cooking1.jpg' width="500" height="100%" ></img></p>
      <style>
        {`
          h1 {
            text-align: center;
            margin-top: 20px;
          }
          p {
            text-align: center;
            font-size: 18px;
          }
          img {
            display: block;
            margin: 0 auto;
            border-radius: 39%;
          }
        `}
      </style>
    </>
  );
}

export default Home;