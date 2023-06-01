import { useState } from "react";
import { UserProfile } from "./userProfile";
import { SignInSignUpPage } from "./signInSignUpPage";

export const MainPage = () => {
  const [user, setValidUser] = useState({});
  const isPersitentUser = sessionStorage.getItem('isPersistentUser');

  return (user?.name || isPersitentUser) ? <UserProfile setValidUser={setValidUser} user={user}/> : <SignInSignUpPage setValidUser={setValidUser}/>;
};
