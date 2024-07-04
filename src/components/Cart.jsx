import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgress from "../store/UserProgress";
import { currencyFormatter } from "../util/formatting";
import CartItem from "./CartItem";
import Button from "./UI/Button";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgress);

  const cartTotal = cartCtx.meals.reduce((acc, meal) => {
    return acc + meal.price * meal.quantity;
  }, 0);

  function onCloseCart() {
    userProgressCtx.hideCart();
  }

  function onShowCheckout() {
    userProgressCtx.showCheckout();
  }

  function onIncreaseCartItem(meal) {
    cartCtx.addMeal(meal);
  }

  function onDecreaseCartItem(id) {
    cartCtx.removeMeal(id);
  }

  return (
    <Mo
      dal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onCloseModal={onCloseCart}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.meals.map((meal) => (
          <CartItem
            key={meal.id}
            cartItem={meal}
            onDecrease={() => onDecreaseCartItem(meal.id)}
            onIncrease={() => onIncreaseCartItem(meal)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={onCloseCart}>
          Close
        </Button>
        {!!cartCtx.meals.length && (
          <Button onClick={onShowCheckout}>Go to checkout</Button>
        )}
      </p>
    </Mo>
  );
}
