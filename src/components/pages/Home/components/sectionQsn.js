import React from 'react';
import '../../../../App.css';
import '../../../../appResponsive.css';
import imgQsn from '../../../../media/img/fd_qsn.jpg'

function SectionQsn() {


    return (
        <section className="qsn">
            <div className="gauche">
                <h2>Qui sommes nous ?</h2>
                <p>Chez Connectify, nous sommes une plateforme sociale dynamique et inclusive, dédiée à connecter les individus du monde entier.
                    Notre objectif est de créer un espace numérique où chacun peut se sentir libre d'exprimer sa véritable identité, de partager ses passions et de tisser des liens authentiques.</p>

            </div>
            <div className="droite">
                <img src={imgQsn} alt="img_qsn" />
            </div>
        </section>
    );
}

export default SectionQsn;