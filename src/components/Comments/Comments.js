import React from 'react';
import './Comments.css';
import STORE from '../../dummy-store';
import moment from 'moment';

function Comments(props) {
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
        </section>
    )
}

export default Comments;