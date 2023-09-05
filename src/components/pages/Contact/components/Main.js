import React from 'react';
import { StyledH2 } from './contact-styled'; // Importez le composant Styled Components
import '../../../../App.css';
import '../../../../appResponsive.css';
import imgContact from '../../../../media/img/fd_contact.jpg'

export default function Main() {


    return (
        <main>
            <section className="contact2">
                <div className="contact_gauche">
                    <img src={imgContact} alt="img_contact" />
                </div>
                <div className="contact_droite">
                <StyledH2>Nous Contacter</StyledH2>
                    <form method="POST" >
                        <div className="content_form">
                            <div className='label_email'>
                                <label name="email">Email:</label>
                                <input type="text" placeholder='Entrez votre email...' />
                            </div>
                            <div className='label_sujet'>
                                <label name="sujet">Sujet:</label>
                                <input type="text" placeholder='Sujet de votre  message..' />
                            </div>
                            <div className='label_message'>
                                <label name="message">Message:</label>
                                <textarea cols="30" rows="10" placeholder='Ecrivez votre  message..'></textarea>
                            </div>

                            <button type='submit'>Valider </button>
                        </div>
                    </form>
                </div>
            </section>

        </main>
    )
}