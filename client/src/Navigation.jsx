import React, { useEffect, useState } from 'react';

// Navigation
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Custom Components
import Notes from './containers/Notes';
import Archieve from './containers/Archieve';
import Bin from './containers/Bin';
import Header from './components/Bar/Header';
import SearchList from './containers/SearchList';
import Home from './components/Home';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './STORE/actions/userActions';
import { getNotes } from './STORE/actions/notesActions';


import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';

// Define theme settings
const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};




const Navigation = () => {

  //darkmode
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('darkmode'));
  const changeTheme = () => {
    localStorage.setItem('darkmode',isDarkTheme);
    setIsDarkTheme(!isDarkTheme);
  };


  const {user}=useSelector(s=>s.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login())
    // dispatch(getNotes())
    setIsDarkTheme(localStorage.getItem('darkmode'));
    // console.log(isDarkTheme)
  }, [user,dispatch])

  if(!user){
    return <Home/>
  }


  return (
    <ThemeProvider theme={ JSON.parse(isDarkTheme ) ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
    <Router>
        <Header setDarkmode={changeTheme} curtheme={isDarkTheme}/>          
          <Route  path="/" component={Notes}  exact/>
          <Route  path="/home" component={Home}  exact/>
          <Route  path="/bin"component={Bin}  exact/>
          <Route  path="/archieve" component={Archieve}  exact/>
          <Route  path="/search" component={SearchList}  exact/>
        
    </Router>
      
      </ThemeProvider>
  );
};

export default Navigation;
