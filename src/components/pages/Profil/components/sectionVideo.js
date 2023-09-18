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

    useEffect(() => {
        // Obtenir les vidéos depuis Firebase Storage
        const videoListRef = ref(storage, 'videos/');

        listAll(videoListRef).then((response) => {
            Promise.all(response.items.map((item) => getDownloadURL(item)))
                .then((urls) => {
                    setVideoList(urls);
                });
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

        fetchVideosFromFirestore();
    }, []);

    const uploadVideo = async () => {
        if (videoUpload == null) return;

        const videoRef = ref(storage, `videos/${videoUpload.name + v4() + '.mp4'}`);

        try {
            const snapshot = await uploadBytes(videoRef, videoUpload);
            const url = await getDownloadURL(snapshot.ref);

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
        const selectedVideo = event.target.files[0];
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


