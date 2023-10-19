import React, { useState, } from 'react';
import '../../../../App.css';
import '../../../../appResponsive.css';
import SectionVideo from './sectionVideo';
import SectionImages from './sectionImages';
import SectionWall from './sectionWall';
import SectionMusique from './sectionMusique';
import '../../../../Style/profil.css';



export default function Main() {
    // État pour gérer l'onglet actif
    const [activeTab, setActiveTab] = useState("all");

    // Fonction pour changer l'onglet actif
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        // Contenu principal du composant Main
        <div id='main-profile'>
            <div id='profile-main-flex'>
                {/* Barre de navigation des onglets */}
                <ul id='profile-section-nav'>
                    {/* Onglet "Tous" */}
                    <li
                        className={activeTab === "all" ? "active" : ""}
                        onClick={() => handleTabChange("all")}
                    >All</li>
                    {/* Onglet "Mur de profil" */}
                    <li
                        className={activeTab === "profile-wall" ? "active" : ""}
                        onClick={() => handleTabChange("profile-wall")}
                    >Wall</li>
                    {/* Onglet "Galerie de profil" */}
                    <li
                        className={activeTab === "profile-gallery" ? "active" : ""}
                        onClick={() => handleTabChange("profile-gallery")}
                    >Gallery</li>
                    {/* Onglet "Vidéo de profil" */}
                    <li
                        className={activeTab === "profile-video" ? "active" : ""}
                        onClick={() => handleTabChange("profile-video")}
                    >Video</li>
                    {/* Onglet "Musique de profil" */}
                    <li
                        className={activeTab === "profile-music" ? "active" : ""}
                        onClick={() => handleTabChange("profile-music")}
                    >Music</li>
                </ul>

                <div id='profil-post-section'>
                    {/* Affiche le contenu en fonction de l'onglet actif */}
                    {(activeTab === "all" || activeTab === "profile-wall") && (<SectionWall />)}
                    {(activeTab === "all" || activeTab === "profile-gallery") && (<SectionImages />)}
                    {(activeTab === "all" || activeTab === "profile-video") && (<SectionVideo />)}
                    {(activeTab === "all" || activeTab === "profile-music") && (<SectionMusique />)}
                </div>
            </div>
        </div>
    );
}
