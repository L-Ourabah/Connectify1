import { UserContextProvider } from '../../../context/userContext';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer'
import React from 'react';

export default function Inscription() {
    return (
 <>
  <UserContextProvider>
     <Header/>
     <Main/>
     <Footer/>
     </UserContextProvider>
     </>
    
    );

}

 