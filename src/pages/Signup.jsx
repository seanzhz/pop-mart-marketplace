import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {ReactComponent as visibilityIcon} from "../assets/svg/visibilityIcon.svg";
import {ReactComponent as ArrowRIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
//firebase guideline
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {db} from '../firebase.config'
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {toast} from "react-toastify";


function Signup(props) {

    const [showPassword, setShowpassword] = useState(false)
    const [formData, setFormData] = useState({
            name:'',
            email: '',
            password: ''
        }
    )
    //extract data
    const {name,email, password} = formData
    const navigate = useNavigate()
    //handle form changes
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }
    const onSubmit = async (e) =>{
        e.preventDefault()
        try{
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(auth,email,password)
            const user = userCredential.user
            await updateProfile(auth.currentUser, {
                displayName: name
            })

            const formDataCopy = {...formData}
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()
            await setDoc(doc(db, 'users', user.uid), formDataCopy)

            navigate('/')
        }catch (err){
            toast.error('Unmatched user name and password')
        }
    }
    return (
        <>
            <div className='pageContainer'>
                <header>
                    <p className='pageHeader'>Sign up your account</p>
                </header>

                <form onSubmit={onSubmit}>

                    <input type='text' className='nameInput'
                           placeholder='Enter name' id='name'
                           value={name} onChange={onChange}/>

                    <input type='email' className='emailInput'
                           placeholder='Enter email' id='email'
                           value={email} onChange={onChange}/>

                    <div className='passwordInputDiv'>
                        <input type={showPassword ? 'text' : 'password'} className='passwordInput'
                               placeholder='Enter password' id='password'
                               value={password} onChange={onChange}/>
                    </div>
                    <img src={visibilityIcon} alt="show password" className='showPassword'
                         onClick={() => setShowpassword((prevState) => !prevState)}/>


                    <Link to='/forgot-password' className='forgotPasswordLink'>
                        Forgot password
                    </Link>

                    <div className="signUpBar">
                        <p className='signUpText'>
                            Sign up
                        </p>
                        <button className='signUpButton'>
                            <ArrowRIcon fill='#ffffff' width='34px' height='34px'/>
                        </button>
                    </div>
                </form>

                {/* O auth*/}

                <Link to='/signin' className='registerLink'>
                    Sign in
                </Link>
            </div>
        </>
    );
}

export default Signup;
