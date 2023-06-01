export const UserProfile = ({userData}) => {
    console.log('User Profile');
    const handleDeleteAccount = (userData) => {
        console.log('account delete click');
    }
    return <div>
        <h2>User Profile</h2>
        <button onClick={handleDeleteAccount}></button>
        </div>
}