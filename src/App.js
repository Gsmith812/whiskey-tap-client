import { useEffect, useState, React } from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import RecipesList from './components/RecipesList/RecipesList';
import LoginPage from './components/LoginPage/LoginPage';
import { Route } from 'react-router-dom';
import SignUpPage from './components/SignUpPage/SignUpPage';
import RecipePage from './components/RecipePage/RecipePage';

function App() {
  

  return (
    <section className='App'>
      <NavBar />
      <Route
        exact path='/'
        component={LandingPage}
      />
      <Route
        exact path='/recipes'
        component={RecipesList}
      />
      <Route
        path='/login'
        component={LoginPage}
      />
      <Route
        path='/sign-up'
        component={SignUpPage}
      />
      <Route
        path='/recipes/:recipe_id'
        component={RecipePage}/>
    </section>
  );
}

export default App;
