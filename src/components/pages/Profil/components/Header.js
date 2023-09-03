import React from 'react';
import '../../../../App.css';
import '../../../../appMobile.css'
import { Link } from 'react-router-dom';



function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
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
          <Link to={'../connexion'}>Déconnexion</Link>
        </div>

        {/*menu mobile*/}
        <span className='burgerMenu' onClick={openNav}>☰ </span>
        <div id="myNav" className="overlay">
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>×</a>
          <div className="overlay-content">
            <h1 >Connectify</h1>
            <Link to={'/profil'}>Profil</Link>
            <Link to={'../contact'}>Contact</Link>
            <Link to={'../connexion'}>Déconnexion</Link>

          </div>
        </div>
      </nav>
      <div className='banniere'>
        <div className='card_profil'>
          <div class="image-container">
            <img id="img" src="https://picsum.photos/seed/picsum/200/300" height="300" width="300" />
            <button id="editButton" class="hidden">Modifier l'image</button>
          </div>
        </div>
      </div>

    </header>
  );
}