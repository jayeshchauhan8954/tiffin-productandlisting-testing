import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { _toastVariants } from '@/utils/constants/constants';

// Constants
const HANDLERS = {
    INITIALIZE: 'INITIALIZE',
    AUTHENTICATE: 'AUTHENTICATE',
    UPDATE: 'UPDATE',
};

const initialState = {
    isInitialized: false,
    isAuthenticated: false,
    user: {}
};

// Auth Reducer
const reducer = (state, action) => {
    switch (action.type) {
        case HANDLERS.AUTHENTICATE:
            return { ...state, isAuthenticated: action.payload, isInitialized: true };
        case HANDLERS.INITIALIZE:
            return { ...state, isInitialized: action.payload };
        case HANDLERS.UPDATE:
            return { ...state, user: action.payload };
    }
}

// Create Auth Context
export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    const updateAuthUser = (data = {}) => {
        dispatch({
            type: HANDLERS.UPDATE,
            payload: data
        });
    }

    const setAuthenticated = (value) => {
        dispatch({
            type: HANDLERS.AUTHENTICATE,
            payload: value
        });
    }

    const setInitialized = (value) => {
        dispatch({
            type: HANDLERS.INITIALIZE,
            payload: value
        });
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                updateAuthUser,
                setAuthenticated,
                setInitialized
            }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuth = () => useContext(AuthContext);