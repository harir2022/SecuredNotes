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


     //login,register
     export const authReducer = (state = { user: {} }, action) => {
          switch (action.type) {
               case  LOGIN_REQUEST:
               case LOAD_USER_REQUEST:
                    return {
                         loading: true,
                         isAuthenticated: false,
                     }

               case LOGIN_SUCCESS:
               case LOAD_USER_SUCCESS:
                    // console.log(action.payload)
                    return {
                         ...state,
                         loading: false,
                         isAuthenticated: true,
                         user: action.payload
                     }

               case LOGIN_FAIL:
               return {
                         ...state,
                         loading: false,
                         isAuthenticated: false,
                         user: null,
                         error: action.payload
                     }

               case LOAD_USER_FAIL:
                         return {
                              loading: false,
                              isAuthenticated: false,
                              user: null,
                              error: action.payload
                         }
          

                    case LOGOUT_SUCCESS:
                         return {
                              loading: false,
                              isAuthenticated: false,
                              user: null
                         }
               
                    case LOGOUT_FAIL:
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
                         return state;
     
          }

     }
