import { useContext } from "react";
import headerLogo from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import UserProgress from "../store/UserProgress";
import Button from "./UI/Button";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgress);

  const totalCartItems = cartCtx.meals.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  function onCartClick() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={headerLogo} alt="Foor app" />
        <h1>Soul kitchen</h1>
      </div>
      <nav>
        <Button textOnly onClick={onCartClick}>
          Cart({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
