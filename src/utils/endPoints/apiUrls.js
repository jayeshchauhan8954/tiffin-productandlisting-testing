import config from "@/utils/config/config"

const appPath = (route) => `${config.SERVER_URL}${route}`

// Define Your Api's End Points
export const _apiUrls = {
    fileUploadToS3: appPath('/v1/s3/upload-s3'),

    auth: {
        login: appPath('/v1/user/login'),
        register: appPath('/v1/user/register'),
        verifyOTP: appPath('/v1/user/verify-otp'),
        resendOTP: appPath('/v1/user/resend-otp'),

        verifyOtpAuth: appPath('/v1/user/verify-otp-auth'),
        changePassword: appPath('/v1/user/change-password'),
        deleteAccount: appPath('/v1/user/delete-account'),
    },
    seller: {
        sellerOnbord: appPath('/v1/vendor/onboard/seller'),
        getCountryCode: appPath('/v1/master/countries'),
    },
    user: {
        userDetails: appPath('/v1/user/user-details'),
        termsCondition: appPath('/v1/master/legals'),
        getCuisine: appPath('/v1/master/cuisine'),
        getEvents: appPath('/v1/user/event'),

        getProduct: appPath('/v1/user/product'),
        recommendedProducts: appPath('/v1/user/product/recommended'),
        productVariants: appPath('/v1/user/product/variants'),
        favorite: appPath('/v1/user/product/favorite'),

        cart: appPath('/v1/user/cart'),
        cartRemove: appPath('/v1/user/cart/remove'),

        order: appPath('/v1/user/order'),
        orderDetails: appPath('/v1/user/order/details'),
        eventOrder: appPath('/v1/user/order/event-order'),
        eventOrderListing: appPath('/v1/user/order/event-orders'),
        rating: appPath('/v1/user/product/rating'),

        // Notification
        unReadNotificationCount: appPath('/v1/user/notification/count'),
        couponPrice: appPath('/v1/user/order/coupon/price'),

        favorite: appPath('/v1/user/product/favorite'),

        // Ticket
        ticketCategory: appPath('/v1/master/category'),
        ticket: appPath('/v1/ticket'),

        reward: appPath('/v1/user/rewards'),
        redeem: appPath('/v1/user/rewards/redeem'),

        faqs: appPath('/v1/master/faqs'),

    },
    masters: {
        deliveryCharges: appPath('/v1/master/delivery-charges/city-or-seller'),
        cusines: appPath('/v1/master/cuisine'),
        dietaries: appPath('/v1/master/dietaries'),
        deliveryTime: appPath('/v1/master/delivery-time'),
        cities: appPath('/v1/master/cities'),
        mealPlansList: appPath('/v1/master/meal-plans'),
        mealType: appPath('/v1/master/meal-types'),
        hub: {
            root: appPath('/v1/master/hub'),
            list: appPath('/v1/master/hub'),
        },
        items: {
            getItems: appPath('/v1/master/vendor/items'),
            addEditItems: appPath('/v1/master/vendor/item'),
        },
        products: {
            root: appPath('/v1/vendor/product'),
            variant: appPath('/v1/vendor/product/variant'),
            getVariants: appPath('/v1/vendor/product/variants'),
            statsCount: appPath('/v1/vendor/product/status-count'),
        },
        orders: {
            list: appPath('/v1/vendor/seller-orders'),
            deliveries: {
                list: appPath('/v1/vendor/seller-orders/order-delivery'),
                upadteDeliveryStatus: appPath('/v1/vendor/seller-orders/order-deliveries')
            }
        },
        dashboard: {
            dashCount: appPath('/v1/vendor/dashboard'),
            dashOrderSummary: appPath('/v1/vendor/dashboard/deliverable-analytics'),
            dashOrderDetails: appPath('/v1/vendor/dashboard/order-details'),
        }
    }
}
