import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage(props) {
    return (
        <section className='LoginPage'>
            <form className='form-container'>
                <h2>Login</h2>
                <div className='input-fields'>
                    <label htmlFor='email'>E-mail Address</label>
                    <input type='email' id='email' name='email' placeholder='johndoe@gmail.com' required />
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' required />
                </div>
                <div className='no-account'>
                    <p>Don't have an account yet?<br />
                    <Link to='/sign-up'>Sign-up Here</Link></p>
                </div>
                <div className='form-button'>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </section>
    )
}

export default LoginPage;