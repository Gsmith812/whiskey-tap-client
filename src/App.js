import { useEffect, useState, React } from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import RecipesList from './components/RecipesList/RecipesList';
import { Route } from 'react-router-dom';

function App() {
  

  return (
    <section className='App'>
      <NavBar />
      <Route
        exact path='/'
        component={LandingPage}
      />
      <Route
        path='/recipes'
        component={RecipesList}
      />
    </section>
  );
}

export default App;
