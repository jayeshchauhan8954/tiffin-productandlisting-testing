import { createSlice } from '@reduxjs/toolkit';

// cart Slice
/**
 * @typedef {Object} CartItem
 * @property {Object<{_id:string,items:[{_id:string,name:string,qty:number,uom:string}],rate:{'$numberDecimal':number},targetMargin:{'$numberDecimal':number}}>} productVariant - Type identifier for the cart item.
 * @property {Object<{_id:string,name:string}>} product - Type identifier for the cart item.
 * @property {Array<{
* qty: string,
* mealType: { _id: string, name: string },
* mealPlan: { _id: string, name: string },
* deliveryTime: { _id: string, name: string },
* deliveryStartDate: Date,
* extras: [{
*   _id: string, name: string,qty:number
* }]
* netAmount: Number
* }>} packs 
*/

/**
 * @typedef {Object.<string, CartItem>} CartState
 * Dynamic object where keys are item IDs and values are cart item details.
 */

/**
 * Initial state for the cart, dynamically keyed by item ID.
 * @type {CartState}
 */
const cartInitialState = {}
export const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        /**
         * Add or update an item in the cart.
         * @param {CartState} state - The current state of the cart.
         * @param {import('@reduxjs/toolkit').PayloadAction<{CartItem}>} action - The action to perform.
         */
        updateCart: (state, action) => {
            return { ...state, ...action.payload };
        },

        removeTempCartVariantId: (state, action) => { /** Remove cart item by varient Id */
            let cartItem = { ...state[action.payload._id] }
            delete cartItem.packs.splice(action.payload.index, 1)
        },

        clearCart: (state, action) => {
            return {};
        },
    },
});

export const { updateCart, removeTempCartVariantId, updateCartByVariantId, clearCart } = cartSlice.actions;
