import React from 'react'
import { IconButton } from '@mui/material';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDispatch } from 'react-redux';
import { login } from '../STORE/actions/userActions';
import './Home.css'
function Home() {

  const dispatch = useDispatch();
  return (
    <div id='body'>
    <div className="cover-container d-flex h-100 p-3 mx-auto flex-column ">
    <header className="masthead mb-auto">
      <div className="inner">
        <h3 className="masthead-brand">SecuredBlock Notes </h3>
      </div>
    </header>
    <main role="main" className="inner cover">
      <h1 className="cover-heading">Save Your Notes Securely</h1>
      <p className="lead"> SecuredBlock Notes  provides a decentralized, secure, and private alternative to traditional cloud-based note-taking platforms, and is ideal for users who are concerned about data privacy and security.
</p>
      <p className="lead">
        <button  className="btn btn-lg btn-secondary"  onClick={()=>dispatch(login())}>Get Started</button>
      </p>
    </main>

   
  </div></div>
  )
}

export default Home