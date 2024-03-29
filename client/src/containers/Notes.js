import React, { useContext, useEffect } from 'react';

// Custom Components
import List from '../components/List/List';
import NoteForm from '../components/Note/NoteForm';
import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../STORE/actions/userActions';
import { getNotes } from '../STORE/actions/notesActions';
import { Link } from 'react-router-dom';

// Context
// import { NoteContext } from '../context/NoteContext';

const Notes = ({match}) => {
  // Calling Context
  // const { notes } = useContext(NoteContext);

  const dispatch = useDispatch();
  
  const {user}= useSelector(s=>s.auth)
  useEffect(() => {
    //     // dispatch(login())
    dispatch(getNotes())      
  }, [user]);
  const {notes}= useSelector(state=>state.notes)


  
  
  // Filtered Arrays
  console.log(notes)
  const nonArchieved = notes && notes!=undefined  && notes.filter((note) => note.content.archieve === false);
  const pinnedNotes = nonArchieved && nonArchieved.filter((note) => note.content.pin === true);
  const others = nonArchieved && nonArchieved.filter((note) => note.content.pin === false);
  
  return (
    <div className='container'>
      <div className='note-form-con'>
        <NoteForm form='Submit' />
      </div>
     <center>
       <button className='submit'  onClick={()=>dispatch(getNotes())} >fetch</button>      
      </center>
      
      {/* <h1>acc : {user && user.account}</h1> */}
      {pinnedNotes ? (
        <div style={{ padding: '20px 0px' }}>
          <h2>Pinned</h2>
          <div className='notes-list'>
            <List notesList={pinnedNotes} list='notes' />
          </div>
        </div>
      ) : (
        <></>
      )}
      {others ? (
        <div style={{ padding: '20px 0px' }}>
          <h2>Others</h2>
          <div>
            <List notesList={others} list='notes' />
          </div>
        </div>
      ) : (
        <h1>No Notes</h1>
      )}
    </div>
  );
};

export default Notes;
