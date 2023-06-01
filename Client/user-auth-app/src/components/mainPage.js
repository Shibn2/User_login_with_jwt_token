import { useState } from "react";
import { UserProfile } from "./userProfile";
import { SignInSignUpPage } from "./signInSignUpPage";

export const MainPage = () => {
  const [user, setValidUser] = useState(false);
  const isPersitentUser = sessionStorage.getItem('isPersistentUser');

  return (user || isPersitentUser) ? <UserProfile/> : <SignInSignUpPage setValidUser={setValidUser}/>;
};
