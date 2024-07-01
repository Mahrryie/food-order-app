import { createContext, useReducer } from "react";

const CartContext = createContext({
  meals: [],
  addMeal: (item) => {},
  removeMeal: (id) => {},
});

function cartReducer(state, actions) {
  if (actions.type === "ADD") {
    const existingItemsID = state.meals.findIndex(
      (item) => item.id === actions.item.id
    );

    const copiedItems = structuredClone(state.meals);

    if (existingItemsID > -1) {
      const existingItem = state.meals[existingItemsID];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      copiedItems[existingItemsID] = updatedItem;
    } else {
      copiedItems.push({ ...actions.item, quantity: 1 });
    }

    return { ...state, meals: copiedItems };
  }
  if (actions.type === "REMOVE") {
    const existingItemsID = state.meals.findIndex(
      (item) => item.id === actions.id
    );

    let copiedItems = structuredClone(state.meals);

    const existingCartItem = copiedItems[existingItemsID];

    if (existingCartItem.quantity === 1) {
      copiedItems = state.meals.filter((item) => item.id !== actions.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      copiedItems[existingItemsID] = updatedItem;
    }

    return { ...state, meals: copiedItems };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { meals: [] });

  function addMeal(meal) {
    dispatch({ type: "ADD", item: meal });
  }

  function removeMeal(id) {
    dispatch({ type: "REMOVE", id });
  }

  const cartCtx = {
    meals: cart.meals,
    addMeal,
    removeMeal,
  };

  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
}

export default CartContext;
