import React, { useContext } from 'react';

// Custom Components
import Note from '../components/Note/Note';
import { useSelector } from 'react-redux';

// Context
// import { NoteContext } from '../context/NoteContext';

const Archieve = () => {
  // Calling Context
  // const { notes } = useContext(NoteContext);
  const {notes}=useSelector(s=>s.notes);

  // Filtered Notes
  const archivedNotes = notes.filter((note) => note.archieve === true);

  return (
    <div className='container'>
      {notes ? (
        <div>
          <div className='heading-con'>
            <h1>Archive Notes</h1>
          </div>

          <div className='notes-list'>
            <div className='row'>
              {archivedNotes.map((data, index) => (
                <Note
                  key={index}
                  title={data.title}
                  note={data.note}
                  pin={data.pin}
                  id={data.id}
                  archiev={data.archieve}
                  bgColor={data.bgColor}
                  checkList={data.checklist}
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
