var map;
// creating a new blank array for all the location's markers.
var markers = [];
// initiating an array of my favourite locations
var myLocations = [
    {
        name: "Saudi Telecom Company",
        locations: {
            lat: 24.753487,
            lng: 46.692301
        }
    },
    {
        name: "T.G.I. Friday's",
        locations: {
            lat: 24.70487,
            lng: 46.66459
        }        
    },
    {
        name: "Al Hilal FC",
        locations: {
            lat: 24.605675,
            lng: 46.624572
        }        
    },
    {
        name: "Riyadh College of Technology",
        locations: {
            lat: 24.733163,
            lng: 46.702631
        }        
    },
    {
        name: "King Faisal Specialist Hospital and Research Centre",
        locations: {
            lat: 24.670283,
            lng: 46.678923
        }        
    }
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        // we used, 40.7413549, -73.99802439999996 or your own!
        center: myLocations["4"].locations,
        zoom: 13
        });
    
    // initiating InfoWindow()
    var infowindow = new google.maps.InfoWindow();
    
    //var myArea = { lat: 24.762256, lng: 46.685021};
    // the following for loop is to create markers for all locations
    for (var i = 0; i < myLocations.length; i++) {
        // geting the position from the myLocations array.
        var position = myLocations[i].locations;
        var name = myLocations[i].name;
        
        var marker = new google.maps.Marker({
             position: position,
             map: map,
             title: name
         });  
        marker.addListener('click', function() {
        populateInfoWindow(this, infowindow);
        });
    }
}

// the below code is taken from the lesson 17.7
function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
      }