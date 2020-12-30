import React, { useContext, useEffect, useState } from 'react';
import './Comments.css';
import moment from 'moment';
import WhiskeyTapContext from '../../context/WhiskeyTapContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../../config';

function Comments(props) {
    const { isLoggedIn, currentUser } = useContext(WhiskeyTapContext);

    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [error, setError] = useState(null);
    const [editCommentClicked, setEditCommentClicked] = useState(false);
    const [selectedComment, setSelectedComment] = useState();

    useEffect(() => {
        async function fetchComments() {
            const request = await axios.get(API_BASE_URL + `/comments/${props.recipe_id}`);
            setComments(request.data);
            setError(null);
        }
        fetchComments();
    }, [props.recipe_id]);

    const handleDeleteComment = comment => {
        setError(null);
        if(!isLoggedIn) {
            setError({
                message: `Must be logged in to delete comments`
            })
        }
        if(currentUser.id !== comment.user_id) {
            setError({
                message: `Only the author of the comment can modify it`
            })
        }
        else {
            async function deleteComment() {
                const request = await axios.delete(API_BASE_URL + `/comments/${props.recipe_id}/${comment.id}`);
                if(request.status !== 204) {
                    setError(request.statusText);
                }
                setComments(comments.filter(prevComment => prevComment.id !== comment.id));
                setError(null);
                setSelectedComment(null);
                setEditCommentClicked(false);
                setCommentContent('');
            }
            deleteComment();
        }

    }

    const handleEditComment = comment => {
        setError(null);
        setEditCommentClicked(true);
        setCommentContent(comment.content);
        setSelectedComment(comment);
    }

    const handleCancelEdit = () => {
        setError(null);
        setCommentContent('');
        setEditCommentClicked(false);
        setSelectedComment(null);
    }

    const handleEditCommentSubmit = e => {
        const { id, recipe_id, date_created, user_id, user_name } = selectedComment;
        const updatedComment = { id, content: commentContent, date_created, recipe_id, user_id, user_name}
        e.preventDefault();
        setError(null);
        if(!isLoggedIn) {
            setError({
                message: `Must be logged in to edit comments`
            })
        }
        if(commentContent === '') {
            setError({
                message: `Comment field must not be blank`
            });
        }
        else {
            async function updateComment() {
                const request = await axios.patch(API_BASE_URL + `/comments/${recipe_id}/${id}`, {content: commentContent});
                if (request.status !== 204) {
                    setError(request.statusText)
                }
                setComments(comments.map(comment => 
                    (comment.id !== updatedComment.id) ? comment : updatedComment
                ))
                setSelectedComment(null);
                setEditCommentClicked(false);
                setCommentContent('');
                setError(null);
            }
            updateComment();
        }
    }

    const handleSend = e => {
        e.preventDefault();
        setError(null)
        if(!isLoggedIn) {
            setError({
                message: `Must be logged in to post comments`
            })
        }
        if(commentContent.length === 0) {
            setError({
                message: `Comment field must not be blank`
            })
        }
        else {
            const newComment = { content: commentContent, recipe_id: props.recipe_id, user_id: currentUser.id, user_name: currentUser.userName }
            async function postComment() {
                const request = await axios.post(API_BASE_URL + `/comments/${props.recipe_id}`, newComment);
                setCommentContent('');
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
                                    <span className='comment-badge'>{comment.user_name}</span>
                                    {
                                        (isLoggedIn && currentUser.id === comment.user_id) && 
                                            <>
                                                <FontAwesomeIcon icon={faMinus} className='delete-icon' onClick={() => handleDeleteComment(comment)} />
                                                <FontAwesomeIcon icon={faPencilAlt} className='edit-icon' onClick={() => handleEditComment(comment)} />
                                            </>
                                    }
                                </div>
                                <p className='comment-content'>{comment.content}</p>
                                <p className='comment-date'><span className='comment-badge'>{formattedDate}</span></p>
                            </section>
                        )
                })}
            </section>
            <section className='comment-form'>
                {(isLoggedIn === true) 
                    ? (
                    <form>
                        <label htmlFor='add-comment'>{(editCommentClicked === true) ? 'Edit' : 'Add'} Comment: </label><br />
                        {error && <div className='comment-error'>{error.message}</div>}
                        <textarea id='add-comment' value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
                        {
                            (editCommentClicked === true)
                                ? 
                                    <div className='edit-buttons'>
                                        <button type='submit' onClick={handleEditCommentSubmit}>Change</button>
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                :
                                    <button type='submit' onClick={handleSend}>Send</button>
                        }
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