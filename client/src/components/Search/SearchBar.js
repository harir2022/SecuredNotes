import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Link
import { Link } from 'react-router-dom';
import { setSearchedNotes } from '../../STORE/actions/notesActions';

// import { NoteContext } from '../../context/NoteContext';
// import { NoteActionContext } from '../../context/NoteContext';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  // const { notes } = useContext(NoteContext);
  // const { setSearchedNotes } = useContext(NoteActionContext);
  const dispatch = useDispatch();
  // const {notes} = useSelector(s=>s.notes);

  // useEffect(() => {
  //   let FilteredNotes = notes.filter((item) => {
  //     return item.title.toLowerCase().includes(search.toLowerCase()) !== false;
  //   });
  //   // dispatch(setSearchedNotes(FilteredNotes));
  // }, [search, setSearchedNotes, notes]);

  return (
    <div className='search'>
      <Link to='/search'>
        <i className='fas fa-search'></i>
      </Link>
      {/* <input onChange={(e) => setSearch(e.target.value)} placeholder='Search' /> */}
    </div>
  );
};

export default SearchBar;
