import React, { useContext } from 'react';
import './AddRecipe.css';
import STORE from '../../dummy-store';
import WhiskeyTapContext from '../../context/WhiskeyTapContext';


function AddRecipe(props) {

    const { isLoggedIn } = useContext(WhiskeyTapContext)

    const handleSubmit = e => {
        e.preventDefault();
        props.history.push('/recipes');
    }

    const handleAddItem = e => {
        e.preventDefault();
    }

    const handleCancel = e => {
        e.preventDefault();
        props.history.push('/recipes')
    }

    if(!isLoggedIn) {
        props.history.push('/login')
    }

    return (
        <section className='AddRecipe'>
            <section className='recipe-form'>
                <h2>New Recipe Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className='input-fields'>
                        <label htmlFor='cocktail_name'>Cocktail Name</label>
                        <input type='text' id='cocktail_name' name='cocktail_name' required />
                        <label htmlFor='cocktail_type'>Type of Cocktail</label>
                        <select id='cocktail_type'>{STORE.cocktail_types.map((type, i) => {
                            return <option value={type} key={i}>{type}</option>
                        })}</select>
                        <label htmlFor='whiskey_type'>Type of Whiskey</label>
                        <select id='whiskey_type'>{STORE.whiskey_types.map((type, i) => {
                            return <option value={type} key={i}>{type}</option>
                        })}</select>
                        <label htmlFor='description'>Description</label>
                        <textarea id='description' name='description' />
                        <h4>Ingredients</h4>
                        <div className='ingredients'>
                            <input type='text' name='ingredient-1' />
                            <button className='addItem' onClick={handleAddItem}>+</button>
                        </div>
                        <h4>Cocktail Steps</h4>
                        <div className='cocktail-steps'>
                            <label htmlFor='step-1'>Step 1: </label><br/>
                            <input type='text' id='step-1' name='step_1' />
                            <button className='addItem' onClick={handleAddItem}>+</button>
                        </div>
                    </div>
                    <div className='form-buttons'>
                        <button type='submit'>Add Recipe</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </section>
        </section>
    )
}

export default AddRecipe;