import React, { useState, useEffect } from 'react';
import { storage, db } from '../../../../services/firebase-config';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { v4 } from 'uuid';
import '../../../../Style/profil.css';

function SectionMusic() {
    const [musicUpload, setMusicUpload] = useState(null);
    const [musicList, setMusicList] = useState([]);
    const [musicTitle, setMusicTitle] = useState('');

    useEffect(() => {
        // Obtenir les musiques depuis Firebase Storage
        const musicListRef = ref(storage, 'music/');

        listAll(musicListRef).then((response) => {
            Promise.all(response.items.map((item) => getDownloadURL(item)))
                .then((urls) => {
                    setMusicList(urls);
                });
        });

        // Obtenir les musiques depuis Firestore
        const fetchMusicFromFirestore = async () => {
            const musicCollectionRef = collection(db, 'music');
            const querySnapshot = await getDocs(musicCollectionRef);
            const music = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                music.push({
                    id: doc.id,
                    title: data.titre,
                    url: data.url,
                });
            });

            // Mettre à jour la liste des musiques
            setMusicList(music.map((song) => song.url));
        };

        fetchMusicFromFirestore();
    }, []);

    const uploadMusic = async () => {
        if (musicUpload == null) return;

        const musicRef = ref(storage, `music/${musicUpload.name + v4() + '.mp3'}`);

        try {
            const snapshot = await uploadBytes(musicRef, musicUpload);
            const url = await getDownloadURL(snapshot.ref);

            setMusicList((prev) => [...prev, url]);

            // Demandez à l'utilisateur de choisir le titre
            const userMusicTitle = prompt('Choisissez un titre pour la musique :');

            if (userMusicTitle) {
                // Ajoutez les détails de la musique à Firestore avec le titre choisi
                const musicCollectionRef = collection(db, 'music');
                await addDoc(musicCollectionRef, {
                    titre: userMusicTitle,
                    url: url,
                });
            }

            // Réinitialiser le champ de téléchargement musique après l'envoi
            setMusicUpload(null);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la musique :', error);
        }
    };

    const handleFileInputChange = (event) => {
        const selectedMusic = event.target.files[0];
        setMusicUpload(selectedMusic);
    };

    return (
        <div id="profile-music">
            <h2>Music</h2>
            <div className='option-music'>
                <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                    id="musicFileInput"
                />
                <label htmlFor="musicFileInput">
                   📁
                </label>

                <input
                    type="text"
                    placeholder="Titre de la musique"
                    value={musicTitle}
                    onChange={(e) => setMusicTitle(e.target.value)}
                />

                <button onClick={uploadMusic}>Poster la musique</button>
            </div>
            <div id='profile-music-flex'>
                {musicList.map((url, index) => (
                    <div key={`music-${index}`} className='profile-music-item'>
                        <audio controls>
                            <source src={url} type="audio/mp3" />
                            Votre navigateur ne prend pas en charge l'élément audio.
                        </audio>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SectionMusic;
