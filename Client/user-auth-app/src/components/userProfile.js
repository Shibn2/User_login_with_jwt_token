import { useState } from "react";

export const UserProfile = ({ user, setValidUser }) => {
  console.log("User Profile", user);
  const [userName, setUserName] = useState(sessionStorage.getItem("userName"));


  const handleDeleteAccount = async (user) => {

    console.log("account delete click");
    console.log("userData>>", user);

    const url = "http://localhost:3007/delete";
    const id = sessionStorage.getItem("userId");

    const sendResp = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ id }),
      "Access-Control-Allow-Origin": "*",
      headers: { "Content-Type": "application/json" },
    });

    console.log("response-->", sendResp);

    setValidUser({});
    sessionStorage.clear('isPersistentUser');
    sessionStorage.clear('userId');
    sessionStorage.clear('userName');
    sessionStorage.clear('userToken');
  };

  return (
    <div>
      <h2>Hi {userName}</h2>
      <button onClick={handleDeleteAccount}>Delete Profile</button>
    </div>
  );
};
