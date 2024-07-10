import { combineReducers } from 'redux';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { authSlice } from './slicers/auth';
import { userSlice } from './slicers/user';
import { locationSlice } from './slicers/location';
import { deliveryChargesSlice } from './slicers/deliveryCharges';
import { appSlice } from './slicers/app';
import { cartSlice } from './slicers/cart';
import { notificationSlice } from './slicers/notify';

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  location: locationSlice.reducer,
  cart: cartSlice.reducer,
  deliveryCharges: deliveryChargesSlice.reducer,
  app: appSlice.reducer,
  notification: notificationSlice.reducer
});

export { rootPersistConfig, rootReducer };

