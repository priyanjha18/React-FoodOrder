import { createContext, useReducer } from "react";

export const CartContext=createContext({
    items:[],
    addItem:(item)=>{},
    removeItem:(id)=>{},
    clearItem:()=>{},
})
function cartReducer(state,action){
    if(action.type==="ADD_ITEM"){
        const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.item.id)
        const updatedItems=[...state.items]
        if (existingCartItemIndex>-1){
            const existingItem=state.items[existingCartItemIndex]
            const updatedItem={
                ...existingItem,
                quantity:existingItem.quantity+1
            }
            updatedItems[existingCartItemIndex]=updatedItem;
            
        }
        else{
            updatedItems.push({...action.item,quantity: 1})
        }
        return  {...state,items:updatedItems}

    }
    
    if(action.type==="REMOVE_ITEM"){
        
        const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.id)
        const updatedItems=[...state.items]
        const existingCartItem=state.items[existingCartItemIndex]
        if(existingCartItem.quantity!=1){
            const updatedItem={
                ...existingCartItem,
                quantity:existingCartItem.quantity-1
            }
            updatedItems[existingCartItemIndex]=updatedItem

        }
        else{
            updatedItems.splice(existingCartItemIndex,1)

        }
        return {...state,items:updatedItems}
        //update the state to remove the item
    }
    if(action.type=="CLEAR_ITEM"){
        return {...state,items:[]}
    }
    return state;

}
export function CartContextProvider({children}){
    const[cart,dispatchCartAction]=useReducer(cartReducer,{items:[]})
    
    function addItem(item){
        dispatchCartAction({type:"ADD_ITEM",item:item})
    }
    function removeItem(id){
        dispatchCartAction({type:"REMOVE_ITEM",id})

    }
    function clearItem(){
        dispatchCartAction({type:"CLEAR_ITEM"})
    }
    const cartContext={
        items:cart.items,
        addItem:addItem,
        removeItem:removeItem,
        clearItem:clearItem
    }
    
    console.log(cartContext)
    return <CartContext value={cartContext}>{children}</CartContext>
}

export default CartContext;