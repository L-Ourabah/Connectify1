import React, { useState, useEffect } from 'react';
import { storage, } from '../../../../services/firebase-config'; // Assurez-vous que le chemin d'importation est correct
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import '../../../../Style/profil.css';

function SectionImages() {
  // Créer une fonction setImageUpload et une constante imageUpload
  const [imageUpload, setImageUpload] = useState(null);
  // Créer une fonction setImageList (Cette fonction comporte un tableau) et une constante imageList
  const [imageList, setImageList] = useState([]);
  // Récupère toutes les images uploadées dans le dossier images dans le storage de Firebase
  const imageListRef = ref(storage, "images/")

  // Constante permettant l'upload d'images
  const uploadImage = () => {

    // Si aucune image n'a été sélectionnée, on ne fait rien
    if (imageUpload == null) return;

    //Créer un dossier images dans lequel les images seront uploadées.
    // Lors de l'upload, on changera le nom du fichier par son nom original suivi d'une chaîne de caractère aléatoire puis '.png' 
    const imageRef = ref(storage, `images/${imageUpload.name + v4() + '.png'}`);

    // Donne la référence où doit être uploadée le fichier puis l'image à uploadée.
    uploadBytes(imageRef, imageUpload).then((snapshot) => {

      // Une fois la fonction ci-dessus complétée
      // Récupère l'URL du nouvel élément uploadé et permet de l'afficher sans avoir à recharger la page.
      getDownloadURL(snapshot.ref).then((url) => {

        // On ajoute chaque image via son URL à la liste.
        setImageList((prev) => [...prev, url])

      })

    });
  }

  // Dès le chargement de la page
  useEffect(() => {
    // On met dans une liste la référence du lien des images.
    listAll(imageListRef).then((response) => {
      // Après avoir complété la requête ci-dessus.
      // On passe sur chaque éléments.
      response.items.forEach((item) => {
        // On récupère chaque URL de chaque image uploadée.
        getDownloadURL(item).then((url) => {
          // On ajoute chaque image via son URL à la liste.
          setImageList((prev) => [...prev, url])
        })
      })
    })
  }, []);
 

  return (
    <div id='profile-gallery'>
      <h2>Gallery</h2>
      <div className="option-gallery">
        <label className='custom-file-upload'>
          📁
          <input
            type='file'
            onChange={(event) => {
              // Charge l'image sélectionnée par l'utilisateur
              setImageUpload(event.target.files[0])
            }}
          />
        </label>
        <button onClick={uploadImage} className='add-file'>Poster une image</button>
      </div>


      <div className='profile-gallery-flex'>
        {imageList.map((url) => {
          return <img src={url} />
        })}
      </div>
    </div>
  );
}

export default SectionImages;
