var map;

function initMap() {
         map = new google.maps.Map(document.getElementById('map'), {
             // we used, 40.7413549, -73.99802439999996 or your own!
             center: { lat: 24.762256, lng: 46.685021},
             zoom: 13
         });
         
         var myArea = { lat: 24.762256, lng: 46.685021};
         var marker = new google.maps.Marker({
             position: myArea,
             map: map,
             title: 'First Marker!!'
         });
         var infowindow = new google.maps.InfoWindow({
             content: 'you live here?'
         });
         
         marker.addListener('click', function() {
             infowindow.open(map, marker);
         });
     }