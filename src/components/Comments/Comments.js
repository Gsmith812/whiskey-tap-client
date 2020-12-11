import React, { useContext } from 'react';
import './Comments.css';
import STORE from '../../dummy-store';
import moment from 'moment';
import WhiskeyTapContext from '../../context/WhiskeyTapContext';
import { Link } from 'react-router-dom';

function Comments(props) {
    const { isLoggedIn } = useContext(WhiskeyTapContext);

    const handleSend = e => {
        e.preventDefault();
    }

    const recipeComments = STORE.comments.filter(comment => comment.recipe_id === props.recipe_id);
    return (
        <section className='Comments'>
            <h2>Comments</h2>
            <section className='comment-list'>
                {(recipeComments.length === 0)
                    ? <div className='noComments'>No Comments Yet</div>
                    : recipeComments.map((comment, i) => {
                        const author = STORE.users.find(user => (user.id === comment.user_id)).first_name;
                        const formattedDate = moment(comment.date_created).fromNow();
                        return (
                            <section className='comment-item' key={i}>
                                
                                <h4><span>{author}</span></h4> 
                                <p class='comment-content'>{comment.content}</p>
                                <p className='comment-date'><span>{formattedDate}</span></p>
                            </section>
                        )
                })}
            </section>
            <section className='comment-form'>
                {(isLoggedIn === true) 
                    ? (
                    <form>
                        <label htmlFor='add-comment'>Add Comment: </label><br />
                        <textarea id='add-comment' />
                        <button type='submit' onClick={handleSend}>Send</button>
                    </form>
                    )
                    : (
                        <h4><Link to='/login' className='comment-links'>Login</Link> or <Link to='/sign-up' className='comment-links'>Sign-Up</Link> to comment</h4>
                    )
                }
            </section>
        </section>
    )
}

export default Comments;