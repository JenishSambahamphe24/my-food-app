import './style.css' 

 const FavoriteItem = (props)=>{
       const {image, title, id,removeFromFavorites} = props;
    return(
      <div className="favorite-item" key={id}>
      <div>
      <img src={image} alt="image of recipe"/>
      <p>{title}</p>
      <button onClick={removeFromFavorites}>Remove from favorite</button>
      </div>
      </div>
    )
 }
 export default FavoriteItem;