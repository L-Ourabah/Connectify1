import React from 'react';
import '../../../../App.css';
import '../../../../appResponsive.css';



function SectionNews() {


    return (
        <section className="news">

            <div className="content_news">
                <h2>Newsletter</h2>
                <p>Inscrivez-vous à notre newsletter pour rester informé(e) et connecté(e) avec Connectify !</p>
                <input type="text" placeholder='Entrez votre email...' />
                <button type="submit">Valider</button>
            </div>

        </section>
    );
}

export default SectionNews;