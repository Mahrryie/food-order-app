import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressProvider } from "./store/UserProgress";

function App() {
  return (
    <>
      <CartContextProvider>
        <UserProgressProvider>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </UserProgressProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
