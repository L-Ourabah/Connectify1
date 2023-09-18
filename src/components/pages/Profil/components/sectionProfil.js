import React, { useState, useEffect } from 'react';
import { storage, db, auth } from '../../../../services/firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import Avatar from '../../../../media/img/avatar.jpg';
import '../../../../Style/profil.css';

function SectionProfil() {
    const [newImage, setNewImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [user, setUser] = useState(null);

    // Obtenir les informations de l'utilisateur actuellement connecté
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    // Fonction pour mettre à jour l'image de profil
    const updateProfileImage = async () => {
        if (newImage == null || !user) return;

        // Étape 1 : Mettez à jour l'image dans Firebase Storage
        const storageRef = ref(storage, `profile-images/${newImage.name}`);
        try {
            const snapshot = await uploadBytes(storageRef, newImage);
            const downloadUrl = await getDownloadURL(snapshot.ref);

            // Étape 2 : Mettez à jour l'URL de l'image de profil dans Firestore
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, { photoURL: downloadUrl });

            // Mettez à jour l'URL de l'image de profil dans le composant
            setImageUrl(downloadUrl);

            // Réinitialisez le champ de sélection de fichier
            setNewImage(null);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'image de profil :', error);
        }
    };

    // Gérez le changement de fichier sélectionné
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewImage(file);
    };

    return (
        <div className='banniere'>
            <div className='cardProfil'>
                <div className="image-container">
                    <img src={imageUrl ||Avatar } alt="Photo de profil" />
                    <input 
                    
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <button  onClick={updateProfileImage}>{/*Modifier l'image*/}✏️ </button>
                </div>
                <div className='name'>
                    <p id='profile-lastname'>LOUNNAS</p>
                    <p id='profile-firstname'>Ourabah</p>
                </div>
            </div>
        </div>
    );
}

export default SectionProfil;

