import React, { useContext, useEffect } from 'react';

// Custom Components
import Note from '../components/Note/Note';
import { useSelector } from 'react-redux';

// Context
// import { NoteContext } from '../context/NoteContext';

const SearchList = ({match}) => {
  
  // Calling Context
  // const { searchedNotes } = useContext(NoteContext);
useEffect(() => {
    
}, [match])

  const {searchedNotes}= useSelector(state=>state.note);

  return (
    <div className='container'>
      {searchedNotes ? (
        <div className='notes-list'>
          <div className='row'>
            {searchedNotes.map((data, index) => (
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
      ) : (
        <p>No Archieved Notes Yet</p>
      )}
    </div>
  );
};

export default SearchList;
