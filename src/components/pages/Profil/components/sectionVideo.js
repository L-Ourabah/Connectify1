import React, { useState, useEffect } from 'react';
import { storage, db } from '../../../../services/firebase-config';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { v4 } from 'uuid';
import '../../../../Style/profil.css';



function SectionVideo() {
    const [videoUpload, setVideoUpload] = useState(null);
    const [videoList, setVideoList] = useState([]);
    const [videoTitle, setVideoTitle] = useState('');

    // Utilisez le hook 'useEffect' pour obtenir les vidéos depuis Firebase Storage lorsque le composant est monté.
    useEffect(() => {
        // Créez une référence à la liste de vidéos dans Firebase Storage.
        const videoListRef = ref(storage, 'videos/');

        // Utilisez la fonction 'listAll' pour obtenir une liste de tous les fichiers dans le répertoire 'videos/'.
        listAll(videoListRef)
            .then((response) => {
                // La réponse contient un tableau d'objets 'items', chaque objet représentant un fichier dans le répertoire.

                // Utilisez 'Promise.all' pour exécuter des requêtes 'getDownloadURL' pour chaque fichier et obtenir les URL de téléchargement.
                Promise.all(response.items.map((item) => getDownloadURL(item)))
                    .then((urls) => {
                        // Une fois que toutes les URL de téléchargement ont été obtenues, vous pouvez les stocker dans l'état de votre composant.
                        setVideoList(urls);
                    })
            });

        // Obtenir les vidéos depuis Firestore
        const fetchVideosFromFirestore = async () => {
            const videosCollectionRef = collection(db, 'videos');
            const querySnapshot = await getDocs(videosCollectionRef);
            const videos = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                videos.push({
                    id: doc.id,
                    title: data.titre,
                    url: data.url,
                });
            });

            // Mettre à jour la liste des vidéos
            setVideoList(videos.map((video) => video.url));
        };
        // Déclenche la récupération initiale des vidéos à partir de Firebase Firestore.
        fetchVideosFromFirestore();
    }, []);

    const uploadVideo = async () => {
        // Vérifiez si un fichier vidéo a été sélectionné. S'il est null, ne faites rien.
        if (videoUpload == null) return;

        // Créez une référence au fichier vidéo dans Firebase Storage avec un nom de fichier unique généré par la fonction v4() de la bibliothèque uuid.
        const videoRef = ref(storage, `videos/${videoUpload.name + v4() + '.mp4'}`);

        try {
            // Utilisez la fonction 'uploadBytes' pour télécharger le fichier vidéo vers Firebase Storage. Elle renvoie un objet 'snapshot' qui permet de suivre la progression du téléchargement.
            const snapshot = await uploadBytes(videoRef, videoUpload);

            // Une fois le téléchargement terminé avec succès, utilisez 'getDownloadURL' pour obtenir l'URL de téléchargement de la vidéo.
            const url = await getDownloadURL(snapshot.ref);

            // Mettez à jour la liste des vidéos en ajoutant la nouvelle URL de téléchargement à l'état existant.
            setVideoList((prev) => [...prev, url]);

            // Demandez à l'utilisateur de choisir le titre
            const userVideoTitle = prompt('Choisissez un titre pour la vidéo :');

            if (userVideoTitle) {
                // Ajoutez les détails de la vidéo à Firestore avec le titre choisi
                const videosCollectionRef = collection(db, 'videos');
                await addDoc(videosCollectionRef, {
                    titre: userVideoTitle,
                    url: url,
                });
            }

            // Réinitialiser le champ de téléchargement vidéo après l'envoi
            setVideoUpload(null);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la vidéo :', error);
        }
    };

    const handleFileInputChange = (event) => {
        // Récupère le fichier vidéo sélectionné par l'utilisateur à partir de l'événement.
        const selectedVideo = event.target.files[0];

        // Met à jour l'état 'videoUpload' avec le fichier vidéo sélectionné.
        setVideoUpload(selectedVideo);
    };


    return (
        <div id="profile-video">
            <h2>Video</h2>
            <div className='option-video'>
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                    id="videoFileInput"
                />
                <label htmlFor="videoFileInput">
                    {/*Choisissez une vidéo <br/>*/} 📁
                </label>

                <input
                    type="text"
                    placeholder="Titre de la vidéo"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                />

                <button onClick={
                    uploadVideo}
                >Poster la vidéo</button>
            </div>
            <div id='profile-video-flex'>
                {videoList.map((url, index) => (
                    <div key={`video-${index}`} className='profile-video-item'>
                        <video controls>
                            <source src={url} type="video/mp4" />
                        </video>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SectionVideo;


