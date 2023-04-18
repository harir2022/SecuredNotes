import {
     LOGIN_REQUEST,
     LOGIN_SUCCESS,
     LOGIN_FAIL,
     CLEAR_ERRORS,
     LOAD_USER_FAIL,
     LOAD_USER_SUCCESS,
     LOAD_USER_REQUEST,
     LOGOUT_FAIL,
     LOGOUT_SUCCESS
}
     from '../constants/UserConstants';

     
import Web3 from 'web3';
import Notepad from '../../contracts/Notepad.json'

     const loadWeb3 = async () => {
          if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
          }
          else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
          }
          else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
          }
        };
      
        const loadBlockchainData = async () => {
          const web3 = window.web3;
          // Load account
          const accounts = await web3.eth.getAccounts();
          
          // console.log(accounts)
          const networkId = await web3.eth.net.getId();
          const networkData = Notepad.networks[networkId];
          // console.log(networkData)
          if (networkData) {
            //  todo :
            const notepadContract= new web3.eth.Contract(Notepad.abi, networkData.address)
            const data=  {
               contract:notepadContract,
               account:accounts[0],
               loading:false
          };
          return data;
          //   setLoading(false);
          } else {
            window.alert('Notepad contract not deployed to detected network.');
            const data=  {
               contract:null,
               account:accounts[0],
               loading:false
          };
          return data;
          }
        };
        
     

     //llogin
     export const  login = () => async (dispatch) => {
          console.log("first")
          try {
      
              dispatch({ type: LOGIN_REQUEST })
      
            
      
              await loadWeb3();
              const data  = await loadBlockchainData();
               console.log(data)
              dispatch({
                  type: LOGIN_SUCCESS,
                  payload: data
              })
      
          } catch (error) {
               console.log(error)
              dispatch({
                  type: LOGIN_FAIL,
                  payload: error
              })
          }
      }

 
//        //load current user information  api call 
//        export const loadUser = () => async (dispatch) => {
//         try {
    
//             dispatch({ type: LOAD_USER_REQUEST })
    
//             const data= 
    
//             dispatch({
//                 type: LOAD_USER_SUCCESS,
//                 payload: data.user
//             })
    
//         } catch (error) {
//             dispatch({
//                 type: LOAD_USER_FAIL,
//                 payload: error.response.data.message
//             })
//         }
//     }


//         //logout 
//         export const logout = () => async (dispatch) => {
//           try {
      
//               await axios.get('/api/v1/logout')
      
//               dispatch({
//                   type: LOGOUT_SUCCESS,
//               })
      
//           } catch (error) {
//               dispatch({
//                   type: LOGOUT_FAIL,
//                   payload: error.response.data.message
//               })
//           }
//       }


export const clearError = ()=>async (dispatch)=>{
     dispatch({
          type:CLEAR_ERRORS
     })
}
