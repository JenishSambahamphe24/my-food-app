import './style.css' 

 const RecipeItem = (props)=>{
       const {image, title, id, addToFavorites} = props;
    return(
      <div className="recipe-item" key={id}>
      <div>
      <img src={image} alt="image"/>
      <p>{title}</p>
      <button onClick={addToFavorites}>Add to favorite</button>
      </div>
      </div>
    )
 }
 export default RecipeItem;