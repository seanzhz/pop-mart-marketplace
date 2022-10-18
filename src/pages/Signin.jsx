import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {ReactComponent as visibilityIcon} from "../assets/svg/visibilityIcon.svg";
import {ReactComponent as ArrowRIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import OAuth from "../components/OAuth";

function Signin(props) {

    const [showPassword, setShowpassword] = useState(false)
    const [formData, setFormData] = useState({
            email: '',
            password: ''
        }
    )
    //extract data
    const {email, password} = formData
    const navigate = useNavigate()
    //handle form changes
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                if(user){
                    toast.success('Redirect you to home page')
                    navigate('/')
                }
            })
            .catch((error) => {
                toast.error('Unmatched email or password')
            });

    }
    return (
        <>
            <div className='pageContainer'>
                <header>
                    <p className='pageHeader'>Welcome back!</p>
                </header>

                <form onSubmit={onSubmit}>
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

                    <div className="signInBar">
                        <p className='signInText'>
                            Sign in
                        </p>
                        <button className='signInButton'>
                            <ArrowRIcon fill='#ffffff' width='34px' height='34px'/>
                        </button>
                    </div>
                </form>

                <OAuth/>

                <Link to='/signup' className='registerLink'>
                    Sign up
                </Link>
            </div>
        </>
    );
}

export default Signin;