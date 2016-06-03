function initMap(campsite) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {
            lat: +campsite.lat,
            lng: +campsite.lng
        }
    });
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(+campsite.lat,+campsite.lng),
        map: map,
        title: campsite.title
    });
    // marker.setMap(map);
}