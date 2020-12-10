import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import WhiskeyTapContext from '../../context/WhiskeyTapContext';
import './LoginPage.css';
import STORE from '../../dummy-store';

function LoginPage(props) {

    const [error, setError] = useState(null);

    const { loginFunc } = useContext(WhiskeyTapContext);

    const handleSubmit = e => {
        setError(null);
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const matchedUser = STORE.users.find(user => user.email.toLowerCase() === email.toLowerCase());
        
        if(!matchedUser || (matchedUser.password !== password)) {
            setError(`Username/Password did not match`)
        }
        else {
            loginFunc(matchedUser.first_name, matchedUser.id);
            props.history.push('/recipes');
        }
    }


    return (
        <section className='LoginPage'>
            <form className='form-container' onSubmit={handleSubmit}>
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
                <div className='defaultUser'>
                    <p><b>Demo User</b><br />
                    Email: johndoe@yahoo.com <br />
                    Password: 12345678 </p>
                </div>
                {error && <div className='login-error'>{error}</div>}
            </form>
        </section>
    )
}

export default LoginPage;