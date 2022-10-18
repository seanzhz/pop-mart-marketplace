import React, {useState} from 'react';
import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import {toast} from "react-toastify";
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
import {Link} from "react-router-dom";

function ForgotPassword(props) {
    const [email, setEmail] = useState('')

    const onChange = (e)=>{
        setEmail(e.target.value)

    }

    const onSubmit = async (e)=>{
        e.preventDefault()
        try{
            const auth = getAuth()
            await sendPasswordResetEmail(auth,email)
            toast.success('Reset password email sent.')
        }catch (e) {
            toast.error('Could not sent reset email')
        }
    }

    return (
        <div className='pageContainer'>
            <header>
                <p className='pageHeader'>Forgot password</p>
            </header>

            <main>
                <form onSubmit={onSubmit}>
                    <input type='email' className='emailInput' placeholder='Enter your login email'
                           id='email' value={email} onChange={onChange} />
                    <Link className='forgotPasswordLink' to='/signin'>Sign in</Link>
                    <div className='signUpBar'>
                        <div className='signInText'>Send Reset Link</div>
                        <button className='signInButton'>
                            <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default ForgotPassword;
