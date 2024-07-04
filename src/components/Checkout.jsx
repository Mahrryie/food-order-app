import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgress from "../store/UserProgress";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgress);

  const cartTotal = cartCtx.meals.reduce((acc, meal) => {
    return acc + meal.price * meal.quantity;
  }, 0);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onCloseModal={handleClose}
    >
      <form>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full name" id="full-name" type="text" />
        <Input label="Email" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit order</Button>
        </p>
      </form>
    </Modal>
  );
}
