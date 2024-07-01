import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";

export default function MealItem({ meal }) {
  const { name, description, price, image } = meal;
  const cartCtx = useContext(CartContext);

  function handleOnAddToCart() {
    cartCtx.addMeal(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(price)}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleOnAddToCart}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
