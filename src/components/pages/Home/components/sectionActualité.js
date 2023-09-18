import React  from 'react';
import '../../../../App.css';
import '../../../../appResponsive.css';
import imgActualite from '../../../../media/img/fd_actualite.jpg'

function SectionActualité() {
   

    return (
        <section className="actualite">
        <div className="gauche">
            <img src={imgActualite} alt="img_actualite" />
        </div>
        <div className="droite">
            <h2>Actualité</h2>
            <p>Le lieu où vous pouvez vous connecter avec vos amis, partager des moments spéciaux et explorer de nouvelles rencontres.
                Exprimez-vous à travers des photos, des vidéos et des messages, et découvrez le monde passionnant de la communauté Connectify.
                Rejoignez-nous dès maintenant et commencez à créer des liens, à inspirer et à être inspiré. Connectify est là pour vous aider à rester connecté et à célébrer les moments de la vie, ensemble.</p>
        </div>
    </section>
    );
}

export default SectionActualité;