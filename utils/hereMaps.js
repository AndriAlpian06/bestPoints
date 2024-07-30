const ExpressError = require("./ExpressError");
const baseUrl = 'https://geocode.search.hereapi.com/v1'
const apiKey = 'KAd1CbusIku8CM5B8wQzr8vElnSyn_BWHCC3W-gIroA'

const geocode = async (address) => {
    const url = `${baseUrl}/geocode?q=${address}&apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        // const lat = data.items[0].position.lat;
        // const lng = data.items[0].position.lng;
        // return { lat, lng }
        return data.items[0]
    } catch (err) {
        new ExpressError(err.message, 500)
    }
}

const geometry = async (address) => {
    try {
        const {position} = await geocode(address);
        return {
            type: 'Point',
            coordinates: [position.lng, position.lat]
        }
    } catch (err) {
        new ExpressError(err.message, 500)
    }
}

module.exports = {
    geocode,
    geometry
}