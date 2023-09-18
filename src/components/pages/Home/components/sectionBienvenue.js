import React, { useState, useEffect } from 'react';
import '../../../../App.css';
import '../../../../appResponsive.css';



function SectionBienvenue() {
    const translations = {
        fr: "Bienvenue",
        en: "Welcome",
        es: "Bienvenido",
        de: "Willkommen",
        gf: "ben vini",
        ht: "Byenvini",
        sen: "Akksil ak diam",
        ukr: "Ласкаво просимо",
        bgd: "স্বাগত",
        zh: "欢迎光临",
        dz: 'مرحباً',
        he: "ברוך הבא",
        jp: "いらっしゃいませ",
        kb: "Anṣuf yis-wen",
        az: "ⴰⵏⵚⵓⴼ ⵢⵉⵙ ⵡⴻⵏ",
        mq: "Bienveni"
        // Ajoutez autant de langues que nécessaire
    };

    const [currentLanguage, setCurrentLanguage] = useState("fr"); // État pour stocker la langue actuelle

    useEffect(() => {
        // Utilise useEffect pour déclencher le changement de langue toutes les 1 seconde
        const interval = setInterval(changeLanguage, 1000);

        // Nettoyage du setInterval lorsque le composant est démonté
        return () => clearInterval(interval);
    }, [currentLanguage]); // Déclenche useEffect lorsque currentLanguage change

    function changeLanguage() {
        const languages = Object.keys(translations); // Obtient la liste des langues disponibles
        const nextIndex = (languages.indexOf(currentLanguage) + 1) % languages.length; // Calcule l'index de la prochaine langue
        const nextLanguage = languages[nextIndex]; // Sélectionne la prochaine langue
        setCurrentLanguage(nextLanguage); // Met à jour la langue actuelle avec la prochaine langue
    }

    return (
        <section className='bienvenue'>
            <h1>{translations[currentLanguage]}</h1> {/* Affiche le texte de bienvenue dans la langue actuelle */}
            <p>"Harmonisez vos passions, partagez vos émotions avec Connectify !"</p>
        </section>
    );
}

export default SectionBienvenue;