import products from "./products";
import categories from "./categories";
import users from "./users";
import ordens from "./orden";
import theme from "./theme";
import carrito from "./carrito";
import reviews from "./reviews";

function combineReducer(state = {}, action) {
  return {
    products: products(state.products, action),
    categories: categories(state.categories, action),
    users: users(state.users, action),
    ordens: ordens(state.ordens, action),
    theme: theme(state.theme, action),
    carrito: carrito(state.carrito, action),
    reviews: reviews(state.reviews, action)
  };
}

export default combineReducer;
