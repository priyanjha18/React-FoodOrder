import { useContext } from "react";
import CartContext from "../../Store/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Error from "../Error"
import Button from "./button";
import Modal from "./Modal";
import UserProgressContext from "../../Store/UserProgressContext";
import Input from "./Input";
import useHttp from "../../Hooks/http";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);
  function handleClose() {
    userProgressCtx.hideCheckout();
  }
  function handleFinish(){
    userProgressCtx.hideCheckout();
    cartCtx.clearItem();
    clearData();
  }
  const { data, isLoading, error, sendRequest,clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  async function checkoutAction(fd) {
    const customerData = Object.fromEntries(fd.entries());
    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  
  }
  let action = (
    <>
      {" "}
      <Button textOnly type="button" onClick={handleClose}>
        Close
      </Button>
      <Button>Submit order</Button>
    </>
  );
  if (isLoading) {
    action = (
      <>
        <span>Sending data ....</span>
      </>
    );
  }
  if(error){
    return <Error title="Failed to submit Data" message={error}></Error>
}
  if(data && !error){
    return <Modal open={userProgressCtx.progress === "checkout"} onClose={handleFinish}>
      <h2>Success</h2>
      <p>Your order was submitted Successfully</p>
      <p>We will get back to you within few minutes</p>
      <p className="modal-actions">
        <Button onClick={handleFinish}>Okay</Button>
      </p>
    </Modal>
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={userProgressCtx.progress === "checkout" ? handleClose : null}
    >
      <form action={checkoutAction}>
        <h2>CheckOut</h2>
        <p>Total Price:{currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name"></Input>
        <Input label="E-mail Address" id="email" type="email"></Input>
        <Input label="Street" type="text" id="street"></Input>
        <div className="control-row">
          <Input label="Postal code" type="text" id="postal-code"></Input>
          <Input label="city" type="text" id="city"></Input>
        </div>
        <p className="modal-actions">{action}</p>
      </form>
      
    </Modal>
  );
}
