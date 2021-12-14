//MapBox Token (SHould be replaced with your own token/key)
 mapboxgl.accessToken = 'pk.eyJ1IjoiYmVlbWFuNDAxIiwiYSI6ImNrd2ptcGN3dTB5dWUyd2w1M3Fqc3p4MDUifQ.jvuS1yZeBY_c9bDluTnmeg';


 //Generate new map
 const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: [-71.104081, 42.365554], 
    zoom: 13 
});


// Function that run the buses
async function runBustracker(){ 
    const buses = await getBusLocations();

    buses.forEach( bus => {
        const markerObj = getMarker(bus.id);        
            if(markerObj){
                const marker = Object.values(markerObj)[0];
                moveMarker(marker, bus);
            }else{    
                 addMarker(bus, bus.id);
                }    
});     
setTimeout(runBustracker, 15000); //Adjust as needed to speed up refresh
}

// Gather data from MBTA
async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json     = await response.json();
return json.data;
}
// Add Bus Marker
let markers = [];
function addMarker(bus, id) {
    const marker = new mapboxgl.Marker()
        .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
        .addTo(map);
    const element = {};
    element.marker = marker;
    element.id = id
markers.push(element);   
}

// Move Bus Marker
function moveMarker(marker, bus) {
marker.setLngLat([bus.attributes.longitude, bus.attributes.latitude])
}

// Get Bus Id
function getMarker(busId) {
    const element = markers.find(item => 
        item.id === busId
    );
return element;
}