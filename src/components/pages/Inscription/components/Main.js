import React , {useContext, useRef,useState }from 'react';
import{useNavigate} from "react-router-dom";
import {UserContext} from '../../../../context/userContext';
import '../../../../App.css';
import '../../../../appMobile.css'
import { Link } from 'react-router-dom';
import imgInscription from '../../../../media/img/fd_inscription.jpg'


export default function Main(){
  const {signUp} = useContext(UserContext);

  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  const inputs = useRef([

  ])

  const addInputs = el => {
      if(el && !inputs.current.includes(el)){
          inputs.current.push(el)
      }
  }

  const formRef = useRef();

  const handleForm = async (e) => {
      e.preventDefault()

      if((inputs.current[5].value.length || inputs.current[6].value.length) < 6){
          setValidation("6 caractères minimum")
          return;
      }
      if(inputs.current[5].value !== inputs.current[6].value){
          setValidation("Mots de passe différents !")
          return;
      }

      try{

          await signUp(
              inputs.current[2].value,
              inputs.current[5].value
          )

          formRef.current.reset();
          setValidation("");
          navigate("/Profil");

      }catch(err){

          if(err.code === "auth/invalid-email"){
              
              setValidation("Le format de l'Email est incorrecte")

          }

          if(err.code === "auth/email-already-in-use"){

              setValidation("Cette adresse Email est déjà utilisée")

          }
      }
      
  }
    

    return(
        <main>


        {/*section contact*/}
        <section className="inscription">
                <div className="gauche">
                    <img src={imgInscription} alt="img_inscription "/>
                    </div>
                    <div className="droite_form">
                    <h2>Inscription</h2>
                    <form ref={formRef} onSubmit={handleForm} >
                      

        <div className="content_form_inscription">
        <div className='content_name'>

            <div className='label_nom'>
            <label htmlFor="nom">Nom:</label>
            <input id="nom "type="text" placeholder='Entrez votre nom...'  ref={addInputs} required/> 

</div>
<div className="label_prenom">
    
            <label htmlFor="prenom">Prénom:</label>
            <input id="prenom" type="text" placeholder='Entrez votre prénom...' ref={addInputs} required/>
            </div>
        </div>
        <div className='label_email'>
            <label htmlFor="email">Email:</label>
            <input id="email" type="text" placeholder='Entrez votre email...'  ref={addInputs} required/>
        </div>


        <div className="label_genre">

        <label htmlFor="genre">Genre:</label>
       
            <input type="radio"  name="genre" value="male" id='male' ref={addInputs} />
            <span name="homme">Homme</span>
    
            <input type="radio"  name="genre"  value="female" id='female' ref={addInputs} />
            <span name="femme">Femme</span>
           
        </div>




        <div className='label_mdp'>
        <label htmlFor="mdp">Mot de passe :</label>
            <input id="mdp" type="password" placeholder='Entrez votre mot de passe ...' ref={addInputs}  required/>
        </div>
        <div className='label_mdp'>
        <label htmlFor="mdp_vf">Vérification de mot de passe :</label>
            <input  id="mdp_vf" type="password" placeholder='Entrez votre mot de passe ...' ref={addInputs}  required/>
            <p>{validation}</p>
        </div>

        <button type='submit'>Valider </button>
        </div>
                   </form>

        <div className="link">
                   <p>Déja Inscrit ? </p> <Link to={'../connexion'}>Connectez-vous</Link>
                   </div>
                   </div>
            </section>

  
        </main>
    );
}