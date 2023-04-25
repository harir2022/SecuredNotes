import React, { useContext, useEffect } from 'react';

// Custom Components
import Note from '../components/Note/Note';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from '../STORE/actions/notesActions';
// import { login } from '../STORE/actions/userActions';

// Context
// import { NoteContext } from '../context/NoteContext';

const Archieve = ({match}) => {
  // Calling Context
  // const { notes } = useContext(NoteContext);
  const dispatch=useDispatch();
  const {user}= useSelector(s=>s.auth)
  useEffect(() => {
    // dispatch(login())
    dispatch(getNotes())
  }, [user])

  const {notes}=useSelector(s=>s.notes);
  console.log(notes)

  // Filtered Notes
  const archivedNotes =  notes && notes!=undefined  && notes.filter((note) => note.content.archieve === true);
  // console.log(archivedNotes)
  return (
    <div className='container'>
        <div className='heading-con'>
          <h1>Archive Notes</h1>
        </div>
        <center><button  className='submit' onClick={()=>dispatch(getNotes())} >fetch</button>   </center>
      {notes ? (
        <div>

          <div className='notes-list'>
            <div className='row'>
              {archivedNotes.map((data, index) => (
                <Note
                  key={index}
                  title={data.content.title}
                  note={data.content.note}
                  pin={data.content.pin}
                  id={data.content.id}
                  archiev={data.content.archieve}
                  bgColor={data.content.bgColor}
                  checkList={data.content.checklist}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>No Archieved Notes Yet</p>
      )}
    </div>
  );
};

export default Archieve;
