import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Link
import { Link } from 'react-router-dom';
import { getNotes, setSearchedNotes } from '../../STORE/actions/notesActions';
import { useTheme } from '@emotion/react';
// import { login } from '../../STORE/actions/userActions';

// import { NoteContext } from '../../context/NoteContext';
// import { NoteActionContext } from '../../context/NoteContext';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const {notes} = useSelector(s=>s.notes);
const theme =useTheme();
// console.log(theme)
    useEffect(() => {
      // dispatch(login());
      dispatch(getNotes())
    }, [])
    


  useEffect(() => {   
    let FilteredNotes = notes&&  notes.filter((item) => {
      return item.content.title.toLowerCase().includes(search.toLowerCase()) !== false;
    });
    console.log(FilteredNotes)
    dispatch(setSearchedNotes(FilteredNotes))
  }, [search, setSearchedNotes, notes]);



  return (
    <div className='search'>
      {
      theme.palette.mode==='dark'?<input onChange={(e) => setSearch(e.target.value)} placeholder='Search' style={{borderRadius:'12px' , padding:'12px'}} />      
      :
            <input onChange={(e) => setSearch(e.target.value)} placeholder='Search ' />      
      }
      <Link to='/search'>
        {/* <button onClick={()=>dispatch(getNotes())} >Fetch</button> */}
            <i className='fas fa-search'></i>
      </Link>
    </div>
  );
};

export default SearchBar;
