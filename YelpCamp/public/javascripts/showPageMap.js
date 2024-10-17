//script for map
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
center: foundCampground.geometry.coordinates, // starting position [lng, lat]
zoom: 9 // starting zoom
});

// create the popup
const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
    `<h4> ${foundCampground.title}</h4>
    <p> ${foundCampground.location} </p>`
)

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker()
.setLngLat(foundCampground.geometry.coordinates)
.setPopup(popup)
.addTo(map)

map.addControl(new mapboxgl.NavigationControl());