import React from 'react';
import '../../../../App.css';
import '../../../../appResponsive.css';
import imgContact from '../../../../media/img/fd_contact.jpg'


function SectionContact() {


    return (
        <section className="contact">
            <div className="gauche">
                <img src={imgContact} alt="img_contact" />
            </div>
            <div className="droite">
                <h2>Nous Contacter</h2>
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
    );
}

export default SectionContact;