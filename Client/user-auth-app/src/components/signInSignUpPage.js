
import { useState } from 'react';
import { SignIn } from './signIn';
import { SignUp } from './signUp';

export const SignInSignUpPage = ({ setValidUser }) => {
    const [isUserRegistered, setUserRegistered] = useState(true);
    return isUserRegistered ? <SignIn setUserRegistered={setUserRegistered} setValidUser={setValidUser}/> : <SignUp setUserRegistered={setUserRegistered}/>
}