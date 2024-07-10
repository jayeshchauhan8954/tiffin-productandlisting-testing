import CryptoJS from 'crypto-js';
import config from '../config/config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

/* Alias auth variable */
const localKey = '_local';
const authCookie = 'user_jwt'

function encrypt(data) {
    try {
        return CryptoJS.AES.encrypt(data, config.CRYPTO_SECRET_KEY).toString();
    }
    catch { return null; }
}

function decrypt(data) {
    try {
        return CryptoJS.AES.decrypt(data, config.CRYPTO_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    }
    catch { return null; }
}

const getData = () => {
    try {
        return JSON.parse(decrypt(localStorage.getItem(localKey)))
    }
    catch (err) {
        return err
    }
}

const saveData = (data) => {
    try {
        localStorage.setItem(localKey, encrypt(JSON.stringify(data)))
    }
    catch (err) {
        return err
    }
}

const setAuthCookie = (jwt) => {
    if (config.ENV === "local") {
        return localStorage.setItem(authCookie, jwt)
    } else {
        if (cookies.get(authCookie)) {
            cookies.update(authCookie, jwt, {
                secure: true,
                sameSite: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 365 * 1000, // 1 Year
                expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
            })
        } else {
            cookies.set(authCookie, jwt, {
                secure: true,
                sameSite: true,
                // httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 365 * 1000, // 1 Year
                expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
            })
        }
    }
};

const getAuthCookie = () => {
    if (config.ENV === "local") {
        return localStorage.getItem(authCookie)
    } else {
        return cookies.get(authCookie)
    }
};

const removeAuthCookie = () => {
    try {
        if (config.ENV === "local") {
            localStorage.removeItem(authCookie)
        } else {
            cookies.remove(authCookie)
        }
    } catch (error) {
        console.log(error)
    }
};

const logout = () => {
    if (config.ENV === "local") {
        localStorage.clear()
    } else {
        removeAuthCookie()
    }
}

export {
    logout,
    saveData,
    encrypt as encryptData,
    decrypt as decryptData,
    getData,
    setAuthCookie,
    getAuthCookie,
    removeAuthCookie
}