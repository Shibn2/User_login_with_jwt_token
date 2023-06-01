import { useState } from "react";

export const SignIn = ({ setUserRegistered, setValidUser }) => {
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

  const handleLoginSubmit = async () => {
    console.log("userData>>", userData);
    const url = "http://localhost:3007/signin";
    const sendResp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userData),
      "Access-Control-Allow-Origin": "*",
      headers: { "Content-Type": "application/json" },
    });
    const res = await sendResp.json();
    console.log("received response", res);
    if (sendResp.status === 201) {
      const { id, msg, token } = res;
      console.log("valid user --->>");
      sessionStorage.setItem("isPersistentUser", true);
      sessionStorage.setItem("userToken", token);
      sessionStorage.setItem("userId", id);
      sessionStorage.setItem("userName", userData.userName);

      setUserRegistered(true);
      setValidUser({ name: userData.userName });
    } else {
      setUserRegistered(false);
      setValidUser({});
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
      <button onClick={handleLoginSubmit}>Login</button>
    </div>
  );
};
