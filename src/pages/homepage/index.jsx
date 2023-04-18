import React, { useState, useEffect } from "react"
import RecipeItem from "../../components/recipe-item"
import Search from "../../components/seacrch"
import "./style.css"
import FavoriteItem from "../../components/Favorites"

const Homepage = () => {

    // loading State
    const [loadingState, setloadingState] = useState(false)

    // saving results that we receive from API
    const [recipes, setRecipes] = useState([])

    // Favorites data state
    const [Favorites, setFavorite] = useState([])

    //   API call successful or not
    const [apiCalledSuccess, setApiCalledSuccess] = useState(false);

    const getDataFromSearchComponent = (getData) => {

        //keep the loading state true before calling the api 
        setloadingState(true)

        // calling the API
        async function getReceipes() {
            const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=6f2d52142d8e479bab2fb815e3d8bba5&query=${getData}`)
            const result = await apiResponse.json();
            const { results } = result;
            if (results && results.length > 0) {
                // set loading state as false again
                setloadingState(false)
                // set the recipe state
                setRecipes(results)
                // set apiCalled True
                setApiCalledSuccess(true)
            }
        }
        getReceipes()
    }

    // Favorite Items
    const addToFavorites = (getCurrentRecipeItem) => {
        let cpyFavorite = [...Favorites];
        const index = cpyFavorite.findIndex((item) => {
            return item.id === getCurrentRecipeItem.id
        })
        if (index === -1) {
            cpyFavorite.push(getCurrentRecipeItem)
            setFavorite(cpyFavorite)
            //    Save the favorites in Local storage
            localStorage.setItem('favorites', JSON.stringify(cpyFavorite))
        } else {
            alert("Item is already present in the 'Favorite List' ")
          
        }
    }
    useEffect(() => {
        const extractFavoritesFromLocalStorageOnPageLoad = JSON.parse(localStorage.getItem('favorites'));
        setFavorite(extractFavoritesFromLocalStorageOnPageLoad);
    }, [])

    // Remove From favorites  
    const removeFromFavorites = (getCurrentId) => {
      let cpyFavorites = [...Favorites]
      cpyFavorites = cpyFavorites.filter(item => item.id !== getCurrentId)
      setFavorite(cpyFavorites);
      localStorage.setitem('favorites',JSON.stringify('cpyfavorites'))
    }

    return (
        <div className="homepage">
            <Search getDataFromSearchComponent={getDataFromSearchComponent}
                    apiCalledSuccess={apiCalledSuccess}
                    setApiCalledSuccess={setApiCalledSuccess}
            />

            {/* Show favorite Items */}
            <div className="favorites-wrapper">
                <h1 className="favorites-title">Favorites</h1>
                <div className="favorites">
                    {
                        Favorites && Favorites.length > 0 ?
                            Favorites.map(item => (<FavoriteItem removeFromFavorites={()=>removeFromFavorites(item.id)} id={item.id} image={item.image} title={item.title} />))
                            : null
                    }
                </div>
            </div>

            {/* Show Loading State */}
            {
                loadingState && <div className="loading"> Loading Recipes !! please wait</div>
            }
           
            {/* Render List of Recipes  */}
            <div className="items">
                {recipes && recipes.length > 0 ?
                    recipes.map(item => <RecipeItem addToFavorites={() => addToFavorites(item)} id={item.id} image={item.image} title={item.title} />)
                    : null}
            </div>

        </div>
    )
}
export default Homepage 