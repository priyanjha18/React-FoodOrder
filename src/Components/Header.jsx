import Button from "./UI/button"
import logoImg from "../assets/logo.jpg"
import CartContext from "../Store/CartContext"
import UserProgressContext from "../Store/UserProgressContext";
import { useContext } from "react";
export default function Header(){
    const cartCtx=useContext(CartContext);
    const userProgressCtx=useContext(UserProgressContext)
    const totalCartItems=cartCtx.items.reduce((totalNumberOfItems,item)=>{
        return totalNumberOfItems+item.quantity
    },0)
    function handleClick(){
        userProgressCtx.showCart();
        {console.log(userProgressCtx)}
        

    }
    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="A Pic of restaurant"></img>
            <h1>FoodReact</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleClick}>Cart {`(${totalCartItems})`}</Button>
            
        </nav>
    </header>
}