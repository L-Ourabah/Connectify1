import React from 'react';
import '../../../../App.css';
import '../../../../appResponsive.css';
import SectionActualité from './sectionActualité';
import SectionContact from './sectionContact';
import SectionQsn from './sectionQsn';
import SectionNews from './sectionNews';
import SectionBienvenue from './sectionBienvenue';


export default function Main() {
   

    return (
        <main>

            <SectionBienvenue />
            <SectionActualité />
            <SectionQsn />
            <SectionContact />
            <SectionNews />
            
        </main>
    );
}