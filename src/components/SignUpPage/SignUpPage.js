import React from 'react';
import { Link } from 'react-router-dom';
import './SignUpPage.css';

function SignUpPage(props) {
    return (
        <section className='SignUpPage'>
            <form className='form-container'>
                <h2>Sign Up</h2>
                <div className='input-fields'>
                    <label htmlFor='first-name'>First Name</label>
                    <input type='text' id='first-name' name='first_name' placeholder='John' required />
                    <label htmlFor='last-name'>Last Name</label>
                    <input type='text' id='last-name' name='last_name' placeholder='Doe' required />
                    <label htmlFor='date-of-birth'>Date of Birth</label>
                    <input type='date' id='date-of-birth' name='date_of_birth' required />
                    <label htmlFor='email'>E-mail Address</label>
                    <input type='email' id='email' name='email' placeholder='johndoe@gmail.com' required />
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' required />
                    <label htmlFor='confirm-password'>Confirm Password</label>
                    <input type='password' id='confirm-password' name='confirmPassword' required />
                </div>
                <div className='has-account'>
                    <p>Already have an account?<br />
                    <Link to='/login'>Login Here</Link></p>
                </div>
                <div className='form-button'>
                    <button type='submit'>Create Account</button>
                </div>
            </form>
        </section>
    )
}

export default SignUpPage;