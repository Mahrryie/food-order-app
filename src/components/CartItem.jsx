import { currencyFormatter } from "../util/formatting";

export default function CartItem({ cartItem, onIncrease, onDecrease }) {
  const { name, price, quantity } = cartItem;

  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
