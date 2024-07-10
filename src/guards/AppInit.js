import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// location
import { fetchAddressFromLatLng, fetchCurrentLatLng } from '../utils/helpers/locationHelpers'
import { apiRequest } from '../utils/config/apiRequest'
import { getAuthCookie } from '@/utils/helpers/authHelpers'
import LoadingScreen from '@/components/LoadingScreen'
import { _apiUrls } from '@/utils/endPoints/apiUrls'

// Redux
import { getAuth } from '../redux/selectors/authSelectors'
import { updateLocation } from '@/redux/slicers/location'
import { setAuth } from '@/redux/slicers/auth'
import { updateUser } from '@/redux/slicers/user'
import { setNotificationCounts } from '@/redux/slicers/notify'
import { getCartCount } from '@/redux/selectors/checkoutSelectors'

export default function AppInit({ children }) {
    const [isInit, setIsInit] = useState(false)
    const dispatch = useDispatch()

    const { token, isAuth } = useSelector(getAuth)
    const cartCount = useSelector(getCartCount)

    useEffect(() => { checkPersistance(); fetchUserLocation(); }, [])

    useEffect(() => {
        if (token) {
            fetchUserProfile();
        }
    }, [token, isAuth])

    useEffect(() => {
        fetchNotifcationCount();
    }, [token, isAuth, cartCount])

    // Check user login persistance
    const checkPersistance = async () => {
        let token = getAuthCookie() // Fetch token from cookie
        if (token) {
            dispatch(setAuth({ token, isAuth: true }))
        }
    }

    const fetchUserLocation = async () => {
        try {
            let { latitude, longitude } = await fetchCurrentLatLng()
            const fetchAddress = await fetchAddressFromLatLng(latitude, longitude)

            // Get City Id from location 
            let { data, status } = await apiRequest({
                endUrl: _apiUrls.masters.cities,
                query: { searchQ: fetchAddress.city }
            })
            if (status) {
                if (data?.rows?.length) {
                    fetchAddress.cityId = data?.rows[0]?._id
                }
            }
            dispatch(updateLocation({ latitude, longitude, ...fetchAddress }))
        } catch (error) {

        } finally {
            setIsInit(true) // Set app initialized
        }
    }

    // fetch user profile and save in redux  
    const fetchUserProfile = async () => {
        const { data, status } = await apiRequest({
            method: "GET",
            endUrl: _apiUrls.user.userDetails
        })
        if (status) {
            dispatch(setAuth({ userType: data?.userType }))
            dispatch(updateUser({ ...data }))
        }
    }

    // Fetch all notifcation count
    const fetchNotifcationCount = async () => {
        if (!token) {
            dispatch(setNotificationCounts({
                unReadCount: 0,
                cartCount: 0
            }))
            return
        }

        const { data, status } = await apiRequest({
            method: "GET",
            endUrl: _apiUrls.user.unReadNotificationCount
        })
        if (status) {
            dispatch(setNotificationCounts({
                unReadCount: data?.unreadNotifyCount,
                cartCount: data?.cartNotifyCount
            }))
        }
    }

    if (isInit) { return children }
    else return (<LoadingScreen />)
}