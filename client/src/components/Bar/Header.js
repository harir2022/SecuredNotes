import React, { useState } from 'react';

// Styled Components
import { BiMenu } from 'react-icons/bi';

// Custom Components
import SearchBar from '../Search/SearchBar';

// Link for linking to other page
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Home from '../Home';

// Assets
// import Logo from '../../assets/logo192.png';

// import Logo from '../../assets/applogo.webp'

const Header = ({setDarkmode,curtheme}) => {
  const [show, setShow] = useState(false);


  const {user}= useSelector(state=>state.auth)

  if(!user){
    return <Home/>
  }

  return (
    <div>
      <div>
        <div className='header'>
          <div className='brand'>
            <BiMenu
              className='menu-icon'
              onClick={() => setShow(!show)}
              size={25}
            />
            <img src={"https://previews.123rf.com/images/tvectoricons/tvectoricons1808/tvectoricons180806133/107778111-notes-vector-icon-isolated-on-transparent-background-notes-logo-concept.jpg"} alt='Logo' />
            <h4>SecuredBlock Notes</h4>
          </div>
          <div className='search-bar'>
            <SearchBar />
          </div>
          <div  className="d-none d-md-block" >
                  <div className='brand'>
                    {user && user.account}
                  <IconButton sx={{ ml: 1 }} onClick={setDarkmode} color="inherit">
                                  {curtheme ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    </div>
          </div>
        </div>

        <div
          className='mobile-menu'
          style={{ display: show ? 'block' : 'none' }}
        >
          {/* <Link className='menu-item'  to={{pathname:'/'}}> */}
          <a className='menu-item' href='/'>
            Notes
          </a>
          {/* </Link> */}
      
          {/* <Link className='menu-item' to='/archieve'> */}
          <a className='menu-item' href='/archieve'>
            Archieve
          </a>
          {/* </Link> */}
          {/* <Link className='menu-item' to='/bin'> */}
          <a className='menu-item' href='/bin'>
            Bin
          </a>
          {/* </Link> */}
        </div>
        <div className='mobile-search'>
          <SearchBar />
        </div>
        
      </div>

      <nav className='nav__cont'>
        <ul className='nav'>
          <a href='/' >
            
          {/* <Link to="/"> */}
            <li className='nav__items '>
              <i className='fas fa-lightbulb'></i>
              <p>Notes</p>
            </li>
          {/* </Link> */}
          </a>
        <a href='/archieve'>
          
          {/* <Link to={"/archieve"}> */}
            <li className='nav__items '>
              <i className='fas fa-archive'></i>
              <p>Archive</p>
            </li>
          {/* </Link> */}
        </a>
          <a href='/bin'>
            
          {/* <Link to="/bin"> */}
            <li className='nav__items '>
              <i className='far fa-trash-alt'></i>
              <p>Bin</p>
            </li>
          {/* </Link> */}
          </a>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
