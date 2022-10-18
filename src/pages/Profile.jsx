import React, {useState} from 'react';
import {getAuth, updateProfile} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {doc,updateDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import {toast} from "react-toastify";


function Profile(props) {
    const auth = getAuth()
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setformData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })

    const {name, email} = formData
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.signOut().then(r => (navigate('/')))
        toast.success('Log out successfully.')
    }

    const onSubmit = async (e) => {
        try {
            if(auth.currentUser.displayName !== name){
                //update display name in firebase
                await updateProfile(auth.currentUser,{
                    displayName:name
                })

                //update in firestore
                const userRef = doc(db,'users',auth.currentUser.uid)
                await updateDoc(userRef,{
                    name
                })
            }
        } catch (error) {
            toast.error('Could not update profile, please try later.')
        }
    }

    const onChange = (e) => {
        setformData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    return (
        <div className='profile'>
            <header className='profileHeader'>
                <p className='pageHeader'>My Profile</p>
                <button type='button' className='logOut' onClick={handleLogout}>Log out</button>
            </header>

            <main>
                <div className='profileDetailsHeader'>
                    <p className='profileDetails'>Personal Details</p>
                    <p className='changePersonalDetails' onClick={() => {
                        changeDetails && onSubmit()
                        setChangeDetails((prevState) => !prevState)
                    }}>
                        {changeDetails ? 'done' : 'change'}
                    </p>
                </div>

                <div className='profileCard'>
                    <form>
                        <input id='name' type='text'
                               className={!changeDetails ? 'profileName' : 'profileNameActive'}
                               disabled={!changeDetails} value={name} onChange={onChange}/>

                        <input id='email' type='text'
                               className='profileEmail'
                               disabled={true} value={email}/>
                    </form>
                </div>
            </main>
        </div>)
}

export default Profile;