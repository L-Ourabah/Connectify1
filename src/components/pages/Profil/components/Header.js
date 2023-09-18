import React from 'react';
import '../../../../App.css';
import '../../../../appResponsive.css';
import { Link } from 'react-router-dom';
import SectionProfil from './sectionProfil';



function openNav() {
  console.log("open navbar");
  document.getElementById("myNav").style.width = "100vw";
}

function closeNav() {
  console.log("close navbar");
  document.getElementById("myNav").style.width = "0%";
}

export default function Header() {
  return (
    <header className="header_profil">
      <nav className="navbar_profil">
        <h1 >Connectify</h1>
        <div className="onglets">
          <Link to={'/profil'}>Profil</Link>
          <Link to={'../contact'}>Contact</Link>
          <Link className="btn_deconnexion" to={'../connexion'}>Déconnexion</Link>
        </div>

        {/*menu mobile*/}
        <span className='burgerMenu' onClick={openNav}>☰ </span>
        <div id="myNav" className="overlay">
         {/* Utilisation d'un bouton pour fermer le menu mobile */}
        <button className="closebtn" onClick={closeNav}>×</button>
          <div className="overlay-content">
            <h1 >Connectify</h1>
            <Link to={'/profil'}>Profil</Link>
            <Link to={'../contact'}>Contact</Link>
            <Link to={'../connexion'}>Déconnexion</Link>

          </div>
        </div>
      </nav>
      <SectionProfil />
    
       
    </header>
  );
}