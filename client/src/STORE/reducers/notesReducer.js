import {
    ADD_NOTE,
    ARCHIVE_NOTE,
    PIN_NOTE,
    SET_SEARCHED_NOTES,
    DELETE_NOTE,
    EDIT_NOTE,
    CHANGE_NOTE_COLOR,
    TOGGLE_CHECKLIST,
    ALL_NOTES_FAIL,ALL_NOTES_REQUEST,ALL_NOTES_SUCCESS,
    NOTE_DETAILS_FAIL,NOTE_DETAILS_REQUEST,NOTE_DETAILS_SUCCESS,
    DELETE_NOTE_REQUEST,DELETE_NOTE_SUCCESS,
    NEW_SAVE_NOTES_FAIL,NEW_SAVE_NOTES_REQUEST,NEW_SAVE_NOTES_SUCCESS,
    RESTORE_NOTE,CLEAR_ERRORS,CLEAR_NOTES,HANDLE_ARCHIVE,HANDLE_BG_COLOR,HANDLE_CHECK_LIST,HANDLE_DELETE,HANDLE_EDIT,HANDLE_PIN, ALL_BIN_FAIL, ALL_BIN_REQUEST, ALL_BIN_SUCCESS
  } from '../constants/NotesConstants'
  

  const initialState = {
    notes: JSON.parse(localStorage.getItem('notes')) || [],
    deletedNotes: JSON.parse(localStorage.getItem('deletedNotes')) || [],
    searchedNotes: [],
  };
  

  //note detail
  export const noteDetailsReducer = (state = { note: {} }, action) => {
    switch (action.type) {

        case NOTE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                
            }

        case NOTE_DETAILS_SUCCESS:
            return {
                loading: false,
                note: action.payload
            }
       case CLEAR_NOTES:
               return {
                   ...state,
                   note: null,
                   error:null,
                   loading: false,
               }
   

        case NOTE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


//all note fetch


export const notesReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
      case ALL_NOTES_REQUEST:
      
          return {
              loading: true,
              notes: []
          }

      case ALL_NOTES_SUCCESS:
          return {
              loading: false,
              notes: action.payload,
              notesCount: action.payload.length,
             //  resPerPage: action.payload.resPerPage,
             //  filterednotesCount: action.payload.filterednotesCount
          }

    
      case ALL_NOTES_FAIL:
      
          return {
              loading: false,
              error: action.payload
          }

      case CLEAR_ERRORS:
          return {
              ...state,
              error: null
          }

      default:
          return state;
  }
}




// deleted notes
export const getDeletedNotesReducer = (state = { notes: [] }, action) => {
    switch (action.type) {
        case ALL_BIN_REQUEST:
        
            return {
                loading: true,
                bin: []
            }
            
  
        case ALL_BIN_SUCCESS:
            return {
                loading: false,
                bin: action.payload,
                // notesCount: action.payload.length,
               //  resPerPage: action.payload.resPerPage,
               //  filterednotesCount: action.payload.filterednotesCount
            }
  
      
        case ALL_BIN_FAIL:
        
            return {
                loading: false,
                error: action.payload
            }
  
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
  
        default:
            return state;
    }
  }
  



// save 
export const newNotesReducer = (state = { note: {} }, action) => {
  switch (action.type) {

      case NEW_SAVE_NOTES_REQUEST:
          return {
              ...state,
              loading: true
          }

      case NEW_SAVE_NOTES_SUCCESS:
          return {
              loading: false,
              receipt: action.payload.receipt
          }

      case NEW_SAVE_NOTES_FAIL:
          return {
              ...state,
              error: action.payload,
              loading:false
          }

  
      case CLEAR_ERRORS:
          return {
              ...state,
              error: null,
              loading:false,
          }

      default:
          return state
  }
}

export const deleteNotesReducer = (state = {notes:{}},action)=>{
    
    switch(action.type){

        case DELETE_NOTE_REQUEST:
            return{
                ...state,
                isloading:true
            }
        

        case DELETE_NOTE_SUCCESS:
            const deletedNote = state.notes.find((note) => note.id === action.payload);
            // console.log(notes);
            console.log(action.payload)
            return {
              ...state,
              isloading:false,
              deletedNotes: [...state.deletedNotes, deletedNote],
              notes: state.notes.filter((note) => note.id !== action.payload),
            };
            default:
                return state;
    }
}


//   export const noteReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case ADD_NOTE:
//         console.log(state.account);
//         return {
//           ...state,
//           notes: [...state.notes, action.payload],
//         };
  
//       case ARCHIVE_NOTE:
//         return {
//           ...state,
//           notes: state.notes.map((note) =>
//             note.id === action.payload
//               ? { ...note, archieve: !note.archieve }
//               : note
//           ),
//         };
  
//       case PIN_NOTE:
//         return {
//           ...state,
//           notes: state.notes.map((note) =>
//             note.id === action.payload ? { ...note, pin: !note.pin } : note
//           ),
//         };
  
//       case SET_SEARCHED_NOTES:
//         return {
//           ...state,
//           searchedNotes: action.payload,
//         };
  
//       case DELETE_NOTE:
//         const deletedNote = state.notes.find((note) => note.id === action.payload);
//         console.log(notes);
//         console.log(action.payload)
//         return {
//           ...state,
//           deletedNotes: [...state.deletedNotes, deletedNote],
//           notes: state.notes.filter((note) => note.id !== action.payload),
//         };
  
//       case RESTORE_NOTE:
//         const restoredNote = state.deletedNotes.find((note) => note.id === action.payload);
//         return {
//           ...state,
//           deletedNotes: state.deletedNotes.filter((note) => note.id !== action.payload),
//           notes: [...state.notes, restoredNote],
//         };
  
        
//       case EDIT_NOTE:
//         return {
//           ...state,
//           notes: state.notes.map((note) =>
//             note.id === action.payload.id
//               ? {
//                   ...note,
//                   title: action.payload.title,
//                   note: action.payload.note,
//                   pin: action.payload.pin,
//                   archieve: action.payload.archive,
//                   bgColor: action.payload.color,
//                   checklist: action.payload.addChecklist,
//                 }
//               : note
//           ),
//         };
  
//       case CHANGE_NOTE_COLOR:
//         return {
//           ...state,
//           notes: state.notes.map((note) =>
//             note.id === action.payload.id ? { ...note, bgColor: action.payload.color } : note
//           ),
//         };
  
//       case TOGGLE_CHECKLIST:
//         return {
//           ...state,
//           notes: state.notes.map((note) =>
//             note.id === action.payload ? { ...note, checklist: !note.checklist } : note
//           ),
//         };
  
//       default:
//         return state;
//     }
//   };
  
  
  
    