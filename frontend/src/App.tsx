import React, { useEffect, useState } from 'react';

import { Note as NoteModel} from './models/notes';
import Note from './components/Note';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import styles from "./styles/NotePage.module.css";
import styleUtils from './styles/utils.module.css'
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from './components/AddEditNoteDialog';
import {FaPlus} from 'react-icons/fa'
import AddEditNoteDialog from './components/AddEditNoteDialog';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
function App() {
  


  return (
    <div>
      <NavBar
      loggedInUser={null}
      onSignUpClicked={()=>{}}
      onLoginClicked={()=>{}}
      onLogoutSuccessful={()=>{}}
      />
    <Container className={styles.notesPage}>
    
   
     

      {false && 
      <SignUpModal onDismiss={()=>{}}
      onSignUpSuccessful={()=>{}}
      />
      }
      {
        false &&
        <LoginModal
        onDismiss={()=>{}}
        onLoginSuccessful={()=>{}}
        />
      }
    </Container>
    </div>
    
  );
}

export default App;
