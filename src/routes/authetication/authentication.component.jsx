// import { useEffect } from "react";
// import {getRedirectResult } from 'firebase/auth';
// import { 
//     // auth,
//     signInWithGooglePopup, 
//     createUserDocumentFromAuth,
//     // signInWithGoogleRedirect
//  } from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";


import './authentication.styles.scss';



const Authentication = () => {

    // //---------Google Redirect----------
    // //useEffect Async Function
    // useEffect(() => {
    //     async function func(){
    //         const response = await getRedirectResult(auth);
    //         if(response){
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     }
    //     func();
        
    // },[]);


    // //---------Google Popup----------
    // //Getting from database is always async
    // const logGooglePopupUser = async () => {
    //     const {user} = await signInWithGooglePopup();
    //     await createUserDocumentFromAuth(user);
    // }

    return(
        <div className="authentication-container">
            {/* <button onClick={logGooglePopupUser}>
                Sign in with Google Popup
            </button> */}
            {/* 
            ---------Google Redirect----------
            <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button> */}
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;