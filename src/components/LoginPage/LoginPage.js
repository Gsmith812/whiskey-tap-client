import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import WhiskeyTapContext from '../../context/WhiskeyTapContext';
import './LoginPage.css';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

function LoginPage(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { loginFunc } = useContext(WhiskeyTapContext);

    const handleSubmit = e => {
        setError(null);
        e.preventDefault();
        const userInfo = { email, password };
        async function postLogin() {
            const request = await axios.post(API_BASE_URL + `/users/login`, userInfo)
                .catch(err => {
                    if(err.response) {
                        setError(err.response.data.error.message);
                    }
                })
            if(request) {
                const { userName, id } = request.data;
                loginFunc(userName, id);
                props.history.push('/recipes');
            }
        }
        postLogin();
    }

   const handleInputsChanged = e => {
       e.target.name === 'email' && setEmail(e.target.value);
       e.target.name === 'password' && setPassword(e.target.value);
   }


    return (
        <section className='LoginPage'>
            <form className='form-container' onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className='input-fields'>
                    <label htmlFor='email'>E-mail Address</label>
                    <input type='email' id='email' name='email' placeholder='johndoe@gmail.com' onChange={handleInputsChanged} required />
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' onChange={handleInputsChanged} required />
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