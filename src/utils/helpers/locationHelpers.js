// helpers
import { fromLatLng, fromPlaceId, setDefaults } from 'react-geocode';
import { apiRequest } from '../config/apiRequest';
import { GCP_MAP_URLS } from '../constants/gcp';
import { GC_MAP_KEY } from '../config/config';

setDefaults({
    key: GC_MAP_KEY,
    language: "en",
    region: "es"
});

/**
 * 
 * @returns {Promise<{accuracy: Number , altitude: Number, heading: Number, latitude:Number, longitude: Number, speed: Number} | String}>}
 */
export const fetchCurrentLatLng = async () => {
    try {
        return new Promise(resolve => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(({ coords }) => {
                    resolve(coords)
                })
            }
        })
    } catch (error) {
        return error?.message
    }

}

/**
 * 
 * @param {Number} lat 
 * @param {Number} lng 
 * @returns {Promise<{ address: String,city: String,state: String,country: String,area: String,pincode: Number} | null>}
 */
export const fetchAddressFromLatLng = async (lat, lng) => {
    // Format response
    let response = {
        address: '',
        city: '',
        state: '',
        country: '',
        area: '',
        pincode: ''
    };

    try {

        // Get address from latitude & longitude.
        let { results, status } = await fromLatLng(lat, lng)

        if (status === "OK" && results?.length > 0) {
            const addressComponents = results[0]?.address_components;
            response.address = results[0].formatted_address;

            addressComponents.forEach(component => {
                if (component.types.includes('locality')) {
                    response.city = component.long_name;
                }
                if (component.types.includes('administrative_area_level_1')) {
                    response.state = component.long_name;
                }
                if (component.types.includes('country')) {
                    response.country = component.long_name;
                }
                if (component.types.includes('sublocality') || component.types.includes('neighborhood')) {
                    response.area = component.long_name;
                }
                if (component.types.includes('postal_code')) {
                    response.pincode = component.long_name;
                }
            });
        }
        return response
    } catch (error) {
        console.log("Error while getting address :>", error?.message)
        return response
    }
};

/**
 * 
 * @param {string} placeId 
 * @returns {Promise<{lat:string,lng:string}> || null}
 */
export const getCoordinatesByPlaceId = async (placeId) => {
    try {
        let { status, error_message, results } = await fromPlaceId(placeId)
        let result = results[0]
        if (status === "OK") {
            return result?.geometry?.location
        } else {
            console.log("Get Coordinates :>", error_message)
            return null
        }
    } catch (error) {
        return null
    }
};

/**
 * 
 * @param {string} text 
 * @returns {Promise<Array<{
 * description : string,
 * place_id : string
 * }>>}
 */
export const getPlaces = async (text) => {
    try {
        let { status, error_message, predictions } = await apiRequest({
            method: "GET",
            endUrl: GCP_MAP_URLS.places(text),
            isGoogleApi: true
        })
        if (status === "OK") {
            return predictions
        } else {
            console.log("Get Places :>", error_message)
            return []
        }
    } catch (error) {
        return []
    }
};

