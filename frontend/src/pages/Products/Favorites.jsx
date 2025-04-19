import { useSelector } from 'react-redux';
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from './Product';



const Favorites = () => {
    const favorites = useSelector(selectFavoriteProduct);
    console.log(favorites);
  
return (
    <div>  </div> 
);
};

export default Favorites;