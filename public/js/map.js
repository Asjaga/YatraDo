	mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
        container: 'map', 
        center: listing.geometry.coordinates, 
        zoom: 11
    });

    const marker = new mapboxgl.Marker({ color:"red" })
    .setLngLat(listing.geometry.coordinates)
    .addTo(map)
    .setPopup(new mapboxgl.Popup().setHTML(listing.title))
    .addTo(map);
