import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {  deleteNotesReducer, getDeletedNotesReducer, newNotesReducer, noteDetailsReducer, notesReducer } from './reducers/notesReducer';
import { EthContext, reducer as red } from '../contexts/EthContext';
import { authReducer } from './reducers/userReducer';



const reducer = combineReducers({ 
   notes:notesReducer,//get all note;
   noteDetail:noteDetailsReducer,
   newNote:newNotesReducer,
   bin:getDeletedNotesReducer,
   auth:authReducer//contract , acc
})


const middlware = [thunk];
const store = createStore(
               reducer, 
               applyMiddleware(...middlware)
);

export default store;