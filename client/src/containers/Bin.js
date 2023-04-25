import React, { useContext, useEffect } from 'react';

// Custom Components
import List from '../components/List/List';
import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../STORE/actions/userActions';
import { getNotes } from '../STORE/actions/notesActions';

// Context
// import { NoteContext } from '../context/NoteContext';

const Bin = ({match}) => {
  // Calling Context
  // const { deletedNotes } = useContext(NoteContext);
  const {bin} = useSelector(s=>s.bin);

  const dispatch = useDispatch();
  const {user}= useSelector(s=>s.auth)
  useEffect(() => {
      // dispatch(login())
      dispatch(getNotes());      
  }, [user]);
console.log(bin)
  
  return (
    <div className='container'>
      <div className='heading-con'>
        <h1>Deleted Notes</h1>
      </div>
        <center><button className='submit'  onClick={()=>dispatch(getNotes())} >fetch</button>      </center>
      <div className='notes-list'>
        <div>
          {
            bin ?
                    <List notesList={bin} list='delete' />:<p>No Deleted Notes Yet</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Bin;
