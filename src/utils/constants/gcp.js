import { GC_MAP_KEY } from "../config/config";

export const GCP_MAP_URLS = {
    addressFromLatLng: (lat, lng) => `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GC_MAP_KEY}`,
    places: (input = '') => `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GC_MAP_KEY}&input=${input}`,
    cords: (placeId) => `https://maps.googleapis.com/maps/api/place/details/json?key=${GC_MAP_KEY}&place_id=${placeId}`,
}