import { CART_ADD_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(el => {
                return el.product === item.product
            })
            if (existItem) {
                return {
                    //update cartItem qty you added another one of the same product
                    ...state,
                    cartItems: state.cartItems.map(el => {
                        return el.product === existItem.product ? item : el
                    })
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
            return
        default:
            return state
    }
}