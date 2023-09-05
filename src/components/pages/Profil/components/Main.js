import React from 'react';
import '../../../../App.css';
import '../../../../appResponsive.css';

export default function Main(){

 
    return(
<main>
    <div className='main_profil'>
    <div className='filtre'>
        <div className='filtre_content'>
            filtre
        </div>
    </div>

    
    <div className='profil_content'>
        <div className='all'>
        <section className='walls'>
            <h2>My Walls</h2>
        </section>
        <section className='gallery'>
                <h2>Gallery</h2>
        </section>
        <section className='video'>
                <h2>Video</h2>
             {/* <video id="video_profil" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video> */}   
        </section>
        <section className='music'>
                <h2>Music</h2>
        </section>
        </div>
    </div>
    </div>
</main>

    )

}
