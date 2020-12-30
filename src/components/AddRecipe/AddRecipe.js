import React, { useContext, useState } from 'react';
import './AddRecipe.css';
import STORE from '../../dummy-store';
import WhiskeyTapContext from '../../context/WhiskeyTapContext';
import axios from 'axios';
import { API_BASE_URL } from '../../config';


function AddRecipe(props) {

    const { isLoggedIn, currentUser } = useContext(WhiskeyTapContext)
    const [cocktail_name, setCocktailName] = useState('');
    const [cocktail_type, setCocktailType] = useState('Martini');
    const [whiskey_type, setWhiskeyType] = useState('Irish Whiskey');
    const [description, setDescription] = useState(null);
    const [ingredients, setIngredients] = useState([{ingredient_string: ''}]);
    const [cocktail_steps, setCocktailSteps] = useState([{step_number: 1, step_content: ''}]);
    const [error, setError] = useState(null)

    const handleSubmit = e => {
        setError(null);
        e.preventDefault();
        const newRecipe = { cocktail_name, whiskey_type, cocktail_type, ingredients, cocktail_steps, created_by: currentUser.id };
        newRecipe.description = description;
        async function postRecipe() {
            const request = await axios.post(API_BASE_URL + `/recipes`, newRecipe)
            if(request.status !== 201) {
                setError({message: `Something went wrong`})
            }
            else{
                props.history.push('/recipes');
            }
        }
        postRecipe();
    }

    const handleAddIngredient = e => {
        e.preventDefault();
        setIngredients([...ingredients, { ingredient_string: '' }])
    }

    const handleDeleteIngredient = (e, i) => {
        e.preventDefault();
        setIngredients(ingredients.filter((_, index) => index !== i));
    }

    const handleAddStep = e => {
        e.preventDefault();
        setCocktailSteps([...cocktail_steps, {step_content: ''}])
    }
    
    const handleDeleteStep = (e, i) => {
        e.preventDefault();
        setCocktailSteps(cocktail_steps.filter((_, index) => index !== i));
    }

    const handleCancel = e => {
        e.preventDefault();
        props.history.push('/recipes')
    }

    const handleInputChange = e => {
        //Setting all input changes besides ingredients and cocktail steps in state with one function
        e.target.name === 'cocktailName' && setCocktailName(e.target.value)
        e.target.name === 'whiskeyType' && setWhiskeyType(e.target.value)
        e.target.name === 'cocktailType' && setCocktailType(e.target.value)
        e.target.name === 'description' && setDescription(e.target.value)
    }

    const handleIngredientChanged = (e, index) => {
       ingredients[index] = {...ingredients[index] ,ingredient_string: e.target.value }
       setIngredients([...ingredients])
    }

    const handleStepChanged = (e, index) => {
        cocktail_steps[index] = {...cocktail_steps[index], step_content: e.target.value}
        setCocktailSteps([...cocktail_steps])
    }


    if(!isLoggedIn) {
        props.history.push('/login')
    }

    return (
        <section className='AddRecipe'>
            <section className='recipe-form'>
                <h1>New Recipe Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className='input-fields'>
                        <label htmlFor='cocktail-name'>Cocktail Name</label>
                        <input type='text' id='cocktail-name' name='cocktailName' onChange={handleInputChange} required />
                        <label htmlFor='whiskey-type'>Type of Whiskey</label>
                        <select id='whiskey-type' name='whiskeyType' onChange={handleInputChange}>{STORE.whiskey_types.map((type, i) => {
                            return <option value={type} key={i}>{type}</option>
                        })}</select>
                        <label htmlFor='cocktail-type' onChange={handleInputChange}>Type of Cocktail Glass</label>
                        <select id='cocktail-type' name='cocktailType'>{STORE.cocktail_types.map((type, i) => {
                            return <option value={type} key={i}>{type}</option>
                        })}</select>
                        <label htmlFor='description'>Description</label>
                        <textarea id='description' name='description' onChange={handleInputChange} />
                        <h2>Ingredients</h2>
                        {ingredients.map((ingredient, i) => {
                            return (
                                <div className='ingredients' key={i}>
                                    <input type='text' name={'ingredient-' + (i + 1)} value={ingredient.ingredient_string} onChange={(e) => handleIngredientChanged(e, i)} required />
                                    <button className='item-buttons' onClick={handleAddIngredient}>+</button>
                                    {(ingredients.length > 1) && <button className='item-buttons' onClick={(e) => handleDeleteIngredient(e, i)}>-</button>}
                                </div>
                            )
                        })}
                        <h2>Cocktail Steps</h2>
                        {cocktail_steps.map((step, i) => {
                            cocktail_steps[i].step_number = i + 1;
                            return (
                                <div className='cocktail-steps' key={i}>
                                    <label htmlFor={'step-' + (i + 1)}>Step {i + 1}: </label><br/>
                                    <input type='text' id={'step-' + (i + 1)} name='step_content' value={step.step_content} onChange={(e) => handleStepChanged(e, i)} required/>
                                    <button className='item-buttons' onClick={handleAddStep}>+</button>
                                    {(cocktail_steps.length > 1) && <button className='item-buttons' onClick={(e) => handleDeleteStep(e, i)}>-</button>}
                                </div>
                            )
                        })}
                    </div>
                    {error !== null && <div className='add-recipe-error'>{error.message}</div>}
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