import { useState } from "react";

import { 
    signInAuthUserWithEmailAndPassword, 
    signInWithGooglePopup
 } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";


const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;



    const resetFormFiels = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;

        //Keep others as it is and only change the one mentioned
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            await signInAuthUserWithEmailAndPassword(email,password);
            resetFormFiels();
        }
        catch (error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('Incorrect Password');
                    break;
                case 'auth/user-not-found':
                    alert('No User with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }


    //---------Google Popup----------
    //Getting from database is always async
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }


    return(
        <SignInContainer>
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form 
            onSubmit={handleSubmit}>

                <FormInput
                    label='Email' 
                    type='email' 
                    required 
                    onChange={handleChange} 
                    name='email'
                    value={email}
                />

                <FormInput
                    label='Password' 
                    type='password' 
                    required 
                    onChange={handleChange} 
                    name='password'
                    value={password}
                />

                <ButtonsContainer>
                <Button type="submit">Sign In</Button>
                <Button 
                    type='button'
                    onClick={signInWithGoogle} 
                    buttonType={BUTTON_TYPE_CLASSES.google} >Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
}

export default SignInForm;