import { useState } from 'react';

export const SignUp = () => {
    const [userData, setUserData] = useState({
        userName: '',
        password: '',
    })

    const handleUserDataChange = (e) => {
        const field = e.target.name;
        const changedData = {};
        changedData[`${field}`] = e.target.value;
        setUserData((prevState)=>({
            ...prevState,
            ...changedData,
        }))
    }

    const handleRegistrationSubmit = async() => {
        const url = 'http://localhost:3007/registration'
        const sendResp = await fetch(url, { method: 'POST', body: {...userData}})
        console.log('received response', sendResp)
    }

    return (
        <div>
            <label>
                UserName:
                <input name="userName" type="text" onChange={(e)=>handleUserDataChange(e)}/>
            </label>
            <label>
                Password:
                <input name="password" type="password" onChange={(e)=>handleUserDataChange(e)}/>
            </label>
            <button onClick={handleRegistrationSubmit}>Sign Up</button>
        </div>
    )
}