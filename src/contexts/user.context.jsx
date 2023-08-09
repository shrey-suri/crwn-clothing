import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListerner, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

//as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

/*
    Set current user: payload
*/

const userReducer = (state, action) => {
  const {type, payload} = action;

  switch(type){
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        //Keep Previous States as it is, just update the values we care about
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in the userReducer`);
  }
}

const INITIAL_STATE = {
  currentUser: null
}

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user) => {
      dispatch(createAction(
        USER_ACTION_TYPES.SET_CURRENT_USER,
        user
      ));
    }
    
    const {currentUser} = state;

    const value = {currentUser, setCurrentUser};

    useEffect(() => {
      const unsubsribe =  onAuthStateChangedListerner((user) => {
        if(user){
            createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
      });

      return unsubsribe;
    },[])


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

