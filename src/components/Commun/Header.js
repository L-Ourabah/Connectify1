import React from 'react';
import '../../App.css';
import '../../appResponsive.css';
import video from '../../media/video/fd_accueil.mp4'
import { Link } from 'react-router-dom'



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
    <header className="header_1">
      <nav className="navbar">
        <h1 >Connectify</h1>
        <div className="onglets">
          <Link to={'/'}>Accueil</Link>
          <Link to={'connexion'}>Connexion</Link>
          <Link className="btn_inscription" to={'inscription'}>Inscription</Link>
        </div>

        {/*menu mobile*/}
        <span className='burgerMenu' onClick={openNav}>☰ </span>
        <div id="myNav" className="overlay">
          {/* Utilisation d'un bouton pour fermer le menu mobile */}
          <button className="closebtn" onClick={closeNav}>×</button>
          <div className="overlay-content">
            <h1 >Connectify</h1>
            <Link to={'/'}>Accueil</Link>
            <Link to={'connexion'}>Connexion</Link>
            <Link to={'inscription'}>Inscription</Link>
          </div>

        </div>

      </nav>

      <div className="banniere_accueil">
        <video id="background-video" autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>

        <div className="container">
          <h1>
            Connectify
          </h1>
        </div>
      </div>
    </header>
  );
}