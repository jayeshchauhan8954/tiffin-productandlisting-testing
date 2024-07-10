
const path = (root, route) => `${root}${route}`

// Define Your Moduel Root Paths
const ROOTS = "";

// Next.js pages routes
export const _app_routes = {
    page404: '/404',
    page500: '/page500'
};

export const _routes = {
    root: ROOTS,
    landingPage: path(ROOTS, '/'),
    onboard: path(ROOTS, "/onboard"),
    user: {
        products: path(ROOTS, "/products"),
        productDetails: (productId) => path(ROOTS, `/products/${productId}`),
        
        checkout: (cartId) => path(ROOTS, `/checkout/${cartId}`),
 
        orders: path(ROOTS, "/orders"),
        favorite: path(ROOTS, "/favorite"),

        profile: path(ROOTS, "/profile"),
        rewards: path(ROOTS, "/rewards"),
    },
    seller: {
        dashboard: path(ROOTS, '/seller/dashboard'),
        item: path(ROOTS, '/seller/item'),
        products: {
            list: path(ROOTS, '/seller/products'),
            add: path(ROOTS, '/seller/products/add')
        },
        orders: path(ROOTS, '/seller/orders')
    },
    legalPages: {
        privacy: path(ROOTS, "/legal/privacy-policy"),
        termsConditions: path(ROOTS, "/legal/terms-conditions"),
        deleteAccount: path(ROOTS, "/legal/delete-account")
    }
};
