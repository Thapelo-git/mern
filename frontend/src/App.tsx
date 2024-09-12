import React, { useEffect, useState } from 'react';

import { Note as NoteModel} from './models/notes';
import Note from './components/Note';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';

import styleUtils from './styles/utils.module.css'
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from './components/AddEditNoteDialog';
import {FaPlus} from 'react-icons/fa'
import AddEditNoteDialog from './components/AddEditNoteDialog';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';
import { User } from './models/user';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotesPage from './Pages/NotesPage';
import PrivacyPage from './Pages/PrivacyPage';
import NotFoundPage from './Pages/NotFoundPage';
import styles from "./styles/App.module.css"

function App() {
  
  const [showLoginModal,setShowLoginModal]=useState(false);
  const [ShowSignUpModal,setShowSignUpModal]=useState(false)
  const [loggedInUser,setLoggedInUser]=useState<User|null>(null)


  
  
useEffect(()=>{
  async function fetchloggedInUser(){
    try {
      const user =await NotesApi.getLoggedInUser();
      setLoggedInUser(user)
    } catch (error) {
      console.error(error)
    }
  }
  fetchloggedInUser();
},[])

  return (
    <BrowserRouter>
    <div>
      <NavBar
      loggedInUser={loggedInUser}
      onSignUpClicked={()=>setShowLoginModal(true)}
      onLoginClicked={()=>setShowSignUpModal(true)}
      onLogoutSuccessful={()=>setLoggedInUser(null)}
      />
      <Container className={styles.paddingContainer}>
        <Routes>
          <Route
          path='/' element={<NotesPage loggedInUser={loggedInUser}/>}
          />
          <Route  
          path='/privacy' element={<PrivacyPage/>}
          />
          <Route
          path='/*' element={<NotFoundPage/>}
          />
        </Routes>
      </Container>
      {ShowSignUpModal && 
      <SignUpModal onDismiss={()=>setShowSignUpModal(false)}
      onSignUpSuccessful={(user)=>{
        setLoggedInUser(user);
        setShowSignUpModal(false)
      }}
      />
      }
      {
        showLoginModal &&
        <LoginModal
        onDismiss={()=>setShowLoginModal(false)}
        onLoginSuccessful={(user)=>{
          setLoggedInUser(user)
          setShowLoginModal(false)
        }}
        />
      }
    
    </div>
    </BrowserRouter>
  );
}

export default App;
