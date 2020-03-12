import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
// import "./App.css";

const App = () => {
    const APP_ID = "8f3f85cc";
    const APP_KEY = "5bba13772748d5eaacca048091088482";

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes();
    }, []);

    const exampleReq = 
    `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;
    const getRecipes = async () => {
        console.log("Start fetch");
        const response = await fetch(exampleReq);
        const data = await response.json();
        console.log("Data: " + data);
        setRecipes(data.hits);
    };

    return (
        <div className="App">
            <form className="search-form">
                <input className="search-input" type="text"/>
                <button classname="search-button" type="submit">
                    Search
                </button>
            </form>
            {recipes.map(recipe => (
                <Recipe 
                    title={recipe.recipe.title.label}
                    calories={recipe.recipe.calories}
                    image={recipe.recipe.image}
                />
            ))}
        </div>
    );
}

export default App;