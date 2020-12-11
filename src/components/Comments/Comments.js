import React, { useContext } from 'react';
import './Comments.css';
import STORE from '../../dummy-store';
import moment from 'moment';
import WhiskeyTapContext from '../../context/WhiskeyTapContext';

function Comments(props) {
    const { isLoggedIn } = useContext(WhiskeyTapContext);

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
            {(isLoggedIn === true) && (
                <section className='comment-form'>
                    <form>
                        <label for='add-comment'>Add Comment: </label><br />
                        <textarea id='add-comment' />
                        <button type='submit'>Send</button>
                    </form>
                </section>
            )}
        </section>
    )
}

export default Comments;