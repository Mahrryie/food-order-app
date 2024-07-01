import { useContext, useState } from "react";
import headerLogo from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import Modal from "./UI/Modal";

export default function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalCartItems = cartCtx.meals.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  function onCartClick() {
    setModalVisible(true);
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
        <Modal open={modalVisible}>LOX</Modal>
      </nav>
    </header>
  );
}
