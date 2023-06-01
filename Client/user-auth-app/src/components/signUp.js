import { useState } from "react";

export const SignUp = ({ setUserRegistered }) => {
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  const handleUserDataChange = (e) => {
    const field = e.target.name;
    const changedData = {};
    changedData[`${field}`] = e.target.value;
    setUserData((prevState) => ({
      ...prevState,
      ...changedData,
    }));
  };

  const handleRegistrationSubmit = async () => {
    console.log("userData", userData);
    const url = "http://localhost:3007/registration";
    const sendResp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userData),
      "Access-Control-Allow-Origin": "*",
      headers: { "Content-Type": "application/json" },
    });
    const { msg, token } = await sendResp.json();
    console.log("received response msg", msg);
    if (token) {
      setUserRegistered(true);
    }
  };

  return (
    <div>
      <label>
        UserName:
        <input
          name="userName"
          type="text"
          onChange={(e) => handleUserDataChange(e)}
        />
      </label>
      <label>
        Password:
        <input
          name="password"
          type="password"
          onChange={(e) => handleUserDataChange(e)}
        />
      </label>
      <button onClick={handleRegistrationSubmit}>Sign Up</button>
    </div>
  );
};
