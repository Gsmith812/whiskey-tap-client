import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUpPage.css';
import moment from 'moment';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import WhiskeyTapContext from '../../context/WhiskeyTapContext';

function SignUpPage(props) {

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [date_of_birth, setDateOfBirth] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const ageVerifiedDate = moment().subtract(21, 'years').format('YYYY-MM-DD');

    const { isLoggedIn, loginFunc } = useContext(WhiskeyTapContext);

    const handleInputFieldsChanged = e => {
        e.target.name === 'first_name' && setFirstName(e.target.value);
        e.target.name === 'last_name' && setLastName(e.target.value);
        e.target.name === 'date_of_birth' && setDateOfBirth(e.target.value);
        e.target.name === 'email' && setEmail(e.target.value);
        e.target.name === 'password' && setPassword(e.target.value);
        e.target.name === 'confirmPassword' && setConfirmPassword(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setError(null);
        const newUser = { first_name, last_name, date_of_birth, email, password}
        if(date_of_birth > ageVerifiedDate) {
            setError(`Must be 21 years or older to sign up.`)
        }
        if(password !== confirmPassword) {
            setError(`Passwords do not match`)
        }
        else {
            async function postNewUser() {
                const request = await axios.post(API_BASE_URL + `/users/create`, newUser)
                    .catch(err => {
                        if(err.response) {
                            setError(err.response.data.error.message);
                        };
                    });
                if(request) {
                    const { first_name, id } = request.data;
                    loginFunc(first_name, id);
                    props.history.push('/recipes');
                }
            }
            postNewUser();
        }
    }

    if(isLoggedIn) {
        props.history.push('/recipes');
    }


    return (
        <section className='SignUpPage'>
            <form className='form-container' onSubmit={handleSubmit} onChange={handleInputFieldsChanged}>
                <h2>Sign Up</h2>
                <div className='input-fields'>
                    <label htmlFor='first-name'>First Name</label>
                    <input type='text' id='first-name' name='first_name' placeholder='John' required />
                    <label htmlFor='last-name'>Last Name</label>
                    <input type='text' id='last-name' name='last_name' placeholder='Doe' required />
                    <label htmlFor='date-of-birth'>Date of Birth</label>
                    <input type='date' id='date-of-birth' name='date_of_birth' defaultValue={ageVerifiedDate} required />
                    <label htmlFor='email'>E-mail Address</label>
                    <input type='email' id='email' name='email' placeholder='johndoe@gmail.com' required />
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' required />
                    <label htmlFor='confirm-password'>Confirm Password</label>
                    <input type='password' id='confirm-password' name='confirmPassword' required />
                </div>
                {error && <div className='sign-up-error'>{error}</div>}
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