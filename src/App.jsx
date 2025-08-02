import Header from "./Components/Header.jsx";
import Meals from "./Components/Meals.jsx";
import { CartContextProvider } from "./Store/CartContext.jsx";
import {UserProgressContextProvider} from "./Store/UserProgressContext.jsx";
import Cart from "./Components/UI/Cart.jsx";
import Checkout from "./Components/UI/Checkout.jsx";

function App() {
  return (
    <CartContextProvider>
      
    <UserProgressContextProvider>
    <Header></Header>
    <Meals></Meals>
    <Cart></Cart>
    <Checkout></Checkout>
    </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
 