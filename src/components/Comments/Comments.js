import React, { useContext, useEffect, useState } from 'react';
import './Comments.css';
import moment from 'moment';
import WhiskeyTapContext from '../../context/WhiskeyTapContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

function Comments(props) {
    const { isLoggedIn, currentUser } = useContext(WhiskeyTapContext);

    const [comments, setComments] = useState([]);
    const [addComment, setAddComment] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchComments() {
            const request = await axios.get(`http://localhost:8000/api/comments/${props.recipe_id}`);
            setComments(request.data);
            setError(null);
        }
        fetchComments();
    }, [props.recipe_id]);

    const handleDeleteComment = comment_id => {
        console.log(comment_id);
    }

    const handleEditComment = comment => {
        console.log('edit clicked');
    }

    const handleSend = e => {
        e.preventDefault();
        setError(null)
        if(!isLoggedIn) {
            setError({
                message: `Must be logged in to post comments`
            })
        }
        if(addComment.length === 0) {
            setError({
                message: `Comment field must not be blank`
            })
        }
        else {
            const newComment = { content: addComment, recipe_id: props.recipe_id, user_id: currentUser.id, user_name: currentUser.userName }
            async function postComment() {
                const request = await axios.post(`http://localhost:8000/api/comments/${props.recipe_id}`, newComment);
                setAddComment(null);
                setComments([...comments, {...request.data}]);
            }
            postComment();
        }

    }

    return (
        <section className='Comments'>
            <h2>Comments</h2>
            <section className='comment-list'>
                {(comments.length === 0)
                    ? <div className='noComments'>No Comments Yet</div>
                    : comments.map((comment, i) => {
                        const formattedDate = moment(comment.date_created).fromNow();
                        return (
                            <section className='comment-item' key={i}>
                                
                                <div className='comment-header'>
                                    <span>{comment.user_name}</span>
                                    {
                                        (isLoggedIn && currentUser.id === comment.user_id) && 
                                            <>
                                                <FontAwesomeIcon icon={faMinus} className='delete-icon' onClick={() => handleDeleteComment(comment.id)} />
                                                <FontAwesomeIcon icon={faPencilAlt} className='edit-icon' onClick={handleEditComment} />
                                            </>
                                    }
                                </div>
                                <p className='comment-content'>{comment.content}</p>
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
                        {error && <div className='comment-error'>{error.message}</div>}
                        <textarea id='add-comment' onChange={(e) => setAddComment(e.target.value)} />
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