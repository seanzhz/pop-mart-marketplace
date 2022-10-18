import React from 'react';
import {getAuth, signInWithPopup,GoogleAuthProvider} from "firebase/auth";
import {doc, setDoc,getDoc,serverTimestamp} from "firebase/firestore";
import {db} from '../firebase.config'
import {toast} from "react-toastify";
import googleIcon from '../assets/svg/googleIcon.svg'
import {useLocation, useNavigate} from "react-router-dom";

function OAuth(props) {
    const navigate = useNavigate()
    const location = useLocation()

    const onClick = async ()=>{
        try{
            //Auth stuff
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth,provider)
            const user = result.user
            //Getting the user from db
            const docRef = doc(db,'users',user.uid)
            const docSnap = await getDoc(docRef)
            //if user does not exist in the db
            if(!docSnap.exists()){
                await setDoc(doc(db,'users',user.uid),{
                    name:user.displayName,
                    email: user.email,
                    timestamp:serverTimestamp()
                })
            }
            navigate('/')
            toast.info('Redirect you to home page')
        }
        catch (e) {
            toast.error(e)
        }

    }
    return (
        <div className='socialLogin'>
            <p>Sign {location.pathname ==='/signup'?'Up':'In'} with</p>
            <button className='socialIconDiv'>
                <img className='socialIconImg' src={googleIcon} alt='google icon' onClick={onClick} />
            </button>
        </div>
    );
}

export default OAuth;
