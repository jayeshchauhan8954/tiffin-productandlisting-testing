import { createSelector } from '@reduxjs/toolkit';

export const getCartCount = createSelector(
    (state) => state.cart,
    cart => Object.values(cart)?.reduce((count, item) => {
        if (item?.cartId) {
            return count += item?.packs?.length
        }else{
            return 0
        }
    }, 0)
);

export const getCartPrice = createSelector(
    (state) => state.cart,
    cart => Object.values(cart)?.reduce((total, variant) => total += variant?.packs?.reduce((net, pack) => net += pack?.netAmount, 0), 0) || 0
);

export const getCart = createSelector(
    (state) => state.cart,
    cart => cart
);

export const getCartListing = createSelector(
    (state) => state.cart,
    cart => Object.values(cart)
);

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
 * Selector to get a cart item by its variant ID.
 * 
 * @function getCartByVariantId
 * @param {string} id - The ID of the cart item variant to retrieve.
 * @returns {import('@reduxjs/toolkit').Selector<CartState, CartItem>} A selector that returns the cart item object corresponding to the given variant ID.
 * @example
 */
export const getCartByVariantId = (id) => createSelector(getCart, (cart) => cart[id])
