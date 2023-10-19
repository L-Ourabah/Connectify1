import React, { useState, useEffect } from 'react';
import { db } from '../../../../services/firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import '../../../../Style/profil.css';


function SectionWall() {
    const [postText, setPostText] = useState('');
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsCollectionRef = collection(db, 'messages');
                const querySnapshot = await getDocs(postsCollectionRef);
                const posts = [];

                querySnapshot.forEach((doc) => {
                    posts.push({ id: doc.id, ...doc.data() });
                });

                setPostList(posts);
            } catch (error) {
                console.error('Erreur lors de la récupération des messages :', error);
            }
        };

        fetchPosts();
    }, []);

    const createPost = async () => {
        if (!postText) return; // Ne rien faire si le texte du message est vide

        try {
            const postsCollectionRef = collection(db, 'messages');
            await addDoc(postsCollectionRef, {
                postText: postText,
                timestamp: new Date(),
            });

            // Effacer le texte du message après l'envoi
            setPostText('');
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message :', error);
        }
    };

    return (
        <div id='profile-wall'>
            <h2>My Wall</h2>
            <div id='profile-wall-render'>
                {postList.map((post) => (
                    <div key={post.id} className='profile-wall-post'>
                        {post.postText}
                    </div>
                ))}
            </div>
            <div id='profile-wall-sender'>✍️
                <input
                    placeholder='Écrivez un message'
                    type='text'
                    value={postText}
                    onChange={(event) => setPostText(event.target.value)}
                />
                <button onClick={createPost}>✉️</button>
            </div>
        </div>
    );
}

export default SectionWall;

