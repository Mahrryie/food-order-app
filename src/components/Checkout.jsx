import { useContext, useRef } from "react";
import useHttp from "../hooks/useHttp";
import CartContext from "../store/CartContext";
import UserProgress from "../store/UserProgress";
import { currencyFormatter } from "../util/formatting";
import Error from "./Error";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const formRef = useRef();
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgress);

  const {
    data,
    error,
    isLoading: isSending,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.meals.reduce((acc, meal) => {
    return acc + meal.price * meal.quantity;
  }, 0);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const customerData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.meals,
          customer: customerData,
        },
      })
    );
  }
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onCloseModal={handleFinish}
      >
        <h2>Success</h2>
        <p>Your order sent succesfully</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Close</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onCloseModal={handleClose}
    >
      <form ref={formRef} onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full name" id="name" type="text" />
        <Input label="Email" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>

        {error && <Error title="Failed to sumbit the order" message={error} />}

        <p className="modal-actions">
          {isSending ? (
            <span>Sending order data...</span>
          ) : (
            <>
              <Button type="button" textOnly onClick={handleClose}>
                Close
              </Button>
              <Button>Submit order</Button>
            </>
          )}
        </p>
      </form>
    </Modal>
  );
}
