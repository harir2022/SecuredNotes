
import {deletefilefromipfs, getfromipfs, savetoipfs} from './utils/savetoipfs'
import {
     ADD_NOTE,
     ARCHIVE_NOTE,
     PIN_NOTE,
     SET_SEARCHED_NOTES,
     DELETE_NOTE,
     EDIT_NOTE,
     CHANGE_NOTE_COLOR,
     TOGGLE_CHECKLIST,
     RESTORE_NOTE,CLEAR_ERRORS,CLEAR_NOTES,
     ALL_NOTES_FAIL,ALL_NOTES_REQUEST,ALL_NOTES_SUCCESS,
     NOTE_DETAILS_FAIL,NOTE_DETAILS_REQUEST,NOTE_DETAILS_SUCCESS,
     HANDLE_ARCHIVE,HANDLE_BG_COLOR,HANDLE_CHECK_LIST,HANDLE_DELETE,HANDLE_EDIT,HANDLE_PIN, NEW_SAVE_NOTES_FAIL, NEW_SAVE_NOTES_SUCCESS, DELETE_NOTE_REQUEST, DELETE_NOTE_SUCCESS
   } from '../constants/NotesConstants'

   import store from '../store'
import { ALL_BIN_SUCCESS } from '../constants/NotesConstants';
import { ALL_BIN_REQUEST } from '../constants/NotesConstants';
import { ALL_BIN_FAIL } from '../constants/NotesConstants';

   //helps in geting notes;
const getAllNotesFromBlo= async (acc,noteC)=>{
    // const res = await noteC.methods.addNote("hai ","hai.ipfs").send({from:acc});
    const notesCount =     await noteC.methods.getNoteCount().call({from:acc});
         // console.log(notesCount)
         
    const notes=[]
    const bin=[]
    for(var i=0;i<notesCount;i++){
         const ress = await noteC.methods.getNoteByIndex(i).call({from:acc});
         console.log("from block:");
         console.log(ress )
         if(ress[3]){// deleted notes in blockchain are named as true;
                    const content =await getfromipfs(ress[1]);
                    const note={
                         filename:ress[0],
                         content:content,
                         time:parseInt(ress[2]._hex,16),
                    }        
                    if(ress[0]=="") continue;
                    bin.push(note);           
          

         }else{
          const content =await getfromipfs(ress[1]);
         const note={
              filename:ress[0],
              content:content,
              time:parseInt(ress[2]._hex,16),
         }        
         if(ress[0]=="") continue;
         notes.push(note);             
         }
           
    }
    // console.log(notesCount);
    // console.log(notes);
    return {notes,bin};
}



export const addNote = (note) =>async(dispatch)=>{
    try {
      const {user}=store.getState().auth;
      if(user && user!=undefined){             
               
        const filename = note.title;
        const fileid= note.id;
        const NotepadC= user.contract;
        const account= user.account;               
        // console.log(account , NotepadC)
        // console.log(filename , ipfsCid);
        
        var receipt;
        const fileexist = await NotepadC.methods.noteExists(account,fileid).call();
        if(fileexist) {                    
             console.log("file allready exist")
             throw new Error("File exist already");
        }       


        const ipfsCid= await savetoipfs(note);  

        if(ipfsCid==undefined) throw new Error("ipfs upload failed");
        console.log(filename , ipfsCid);

        
        await NotepadC.methods.addNote(fileid,filename, ipfsCid).send({from:account}) 
        .on('transactionHash', function(hash){
             // console.log('Transaction hash:', hash);
           })
           .on('confirmation', function(confirmationNumber, r){
             console.log('Confirmation number:', confirmationNumber);
             if (confirmationNumber === 1) {
               // Transaction has been confirmed
                 console.log('Transaction receipt:', r);
               receipt=r;
             }
        })
        .on('error', function(error){
             console.error('Error occurred:', error);
             deletefilefromipfs(ipfsCid);
             throw error;
           });
           
        dispatch({
             type: ADD_NOTE,
             payload: note
        })
   }
   else{
        // todo;
   }          

    } catch (error) {
          console.log(error);
    }
   
}


//fetch all notes
//render home page;
export const getNotes =( )=> async (dispatch)=>{
  try {
       dispatch({
            type:ALL_NOTES_REQUEST,
       });                
       dispatch({
            type:ALL_BIN_REQUEST,
       });                
    
       
       const {user}=store.getState().auth;
       var notes;
       var bin;
       if(user){
            const NotepadC= user.contract;
                 const account= user.account;
                 // console.log("welcome here ")
                 const {notes :onotes,bin: obin} = await getAllNotesFromBlo(account,NotepadC)               
                 notes=onotes;
                 bin=obin;
                 
                 var notec=[];
                 var binc=[]
                 for(var note of notes){
                      notec.push(note.content);
               }
                 for(var note of bin){
                      binc.push(note.content);
                 }
                 console.log(notec)
                 console.log(binc)
                 dispatch({
                      type:ALL_NOTES_SUCCESS,
                      payload:notec       
                 })
                 dispatch({
                      type:ALL_BIN_SUCCESS,
                      payload:binc  
                 })
                 
            }          
            
            
       } catch (error) {
            console.log(error)
            dispatch({
                 type:ALL_NOTES_FAIL,
                 payload:error
            })
            dispatch({
                 type:ALL_BIN_FAIL,
                 payload:error
            })
       }
}

//get single note

// //single Notes;
export const getNotesDetails =( id )=> async (dispatch)=>{
  try {
       dispatch({
            type:NOTE_DETAILS_REQUEST,
       });
       
       const {notes}=store.getState().notes;
       
       const {user}=store.getState().auth;
       if(user){
            const NotepadC= user.contract;
            const account= user.account;
            
            const ress = await NotepadC.methods.getNoteByIndex(id).call({from:account});

            const content =await getfromipfs(ress[1]);
            
            const note={
                 filename:ress[0],
                 content:content,
                 time:parseInt(ress[2]._hex,16),
            }      
            // console.log(id );
            // console.log("get" + id );
            // console.log(note)
            
            dispatch({
                 type:NOTE_DETAILS_SUCCESS,
                 payload:note
            })
       }
       
  } catch (error) {
       dispatch({
            type:NOTE_DETAILS_FAIL,
            payload:error
       })
  }
}



   
   export const handleArchive = (id) => ({
     type: HANDLE_ARCHIVE,
     payload: id,
   });
   
   export const handlePin = (id) => ({
     type: HANDLE_PIN,
     payload: id,
   });
   
   export const handleBgColor = (id, color) => ({
     type: HANDLE_BG_COLOR,
     payload: { id, color },
   });
   
   export const handleCheckList = (id) => ({
     type: HANDLE_CHECK_LIST,
     payload: id,
   });
   
   export const handleDelete = (id) =>async(dispatch)=>{

    try {
      const {user}=store.getState().auth;
      if(user && user!=undefined){       
          
          dispatch({
               type:DELETE_NOTE_REQUEST
          })
        
        const fileid= id;
        const NotepadC= user.contract;
        const account= user.account;               
        // console.log(account , NotepadC)
        // console.log(filename , ipfsCid);
               
        const ipfscid = await NotepadC.methods.deleteNote(fileid).send({from:account}) 
        console.log("del ipfscid : "+ipfscid)

     //    todo:
          //  not delte in ipfs cze to maintain trash

// //test
                 
//                  // console.log("welcome here ")
//                  var notes= await getAllNotesFromBlo(account,NotepadC)               
                 
//                  var notec=[];
//                  for(var note of notes){
//                       notec.push(note.content);
//                  }
//                  console.log("after deleteion ");
//                  console.log(notec)
// //test end 
        if(ipfscid!=""){
               //    const res = await deletefilefromipfs(ipfscid);
                  dispatch({
                       type: DELETE_NOTE_SUCCESS,
                       payload:id,
                  })}
        else{
          throw new Error("chain error")
        }
   }
   else{
        // todo;
   }          

    } catch (error) {
          console.log(error);
    }
   
   }
   
   export const handleEdit = (id, title, note, pin, archive, color, addChecklist) => async(dispatch)=>{

      const newnote={
        id: id,
        title:title,
        note:note,
        pin: pin,
        archieve: archive,
        bgColor: color,
        checklist: addChecklist,
      }
      

    // console.log(id + " " )
    console.log(newnote)
    
    try {
      const {user}=store.getState().auth;
      if(user && user!=undefined){             
               
        const filename = title;
        const fileid= id;
        const NotepadC= user.contract;
        const account= user.account;               
        // console.log(account , NotepadC)
        // console.log(filename , ipfsCid);
        
        var receipt;
        const fileexist = await NotepadC.methods.noteExists(account,fileid).call();
        if(!fileexist){
          // console.log("file does not exist");
          throw new Error("file does not exist ")
        }
        const ipfsCid= await savetoipfs(newnote);  

        if(ipfsCid==undefined) throw new Error("ipfs upload failed");
        console.log(filename , ipfsCid);

        
        await NotepadC.methods.updateNote(fileid, ipfsCid,title).send({from:account}) 
        .on('transactionHash', function(hash){
             // console.log('Transaction hash:', hash);
           })
           .on('confirmation', function(confirmationNumber, r){
             console.log('Confirmation number:', confirmationNumber);
             if (confirmationNumber === 1) {
               // Transaction has been confirmed
                 console.log('Transaction receipt:', r);
               receipt=r;
             }
        })
        .on('error', function(error){
             console.error('Error occurred:', error);
             deletefilefromipfs(ipfsCid);
             throw error;
           });
           
        dispatch({
             type: ADD_NOTE,
             payload: note
        })
   }
   else{
        // todo;
   }          

    } catch (error) {
          console.log(error);
        }
        // dispatch({
        //   type: NEW_SAVE_NOTES_FAIL,
        //   payload: receipt
        // })


    }   

   
   export const setSearchedNotes = (notes) => ({
     type: SET_SEARCHED_NOTES,
     payload: notes,
   });
   