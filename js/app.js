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
             title: name,
            wikiPage: '',
             animation: google.maps.Animation.DROP
         });  
        markers.push(marker);        
        addListeners(marker, infowindow);
        myLocations[i].marker = marker;
        myLocations[i].infowindow = infowindow;
    }
    ko.applyBindings(new ViewModel());
}

function addListeners(marker, infowindow) {
    marker.addListener('click', function() {
        populateInfoWindow(marker, infowindow);
        setAnimation(marker);
    });
    getInfoFromWiki(marker);      
}
// create setAnimation function for reusability
function setAnimation(clickedMarker) {
    clickedMarker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            clickedMarker.setAnimation(null);
        }, 3000);
}

// the below code is taken from the lesson 17.7 with some modifications
function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title +
            '</div> <div> <a href="' + marker.wikiPage + '" target="_blank"> Wikipedia Page </a> </div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
}

// Get data from Wiki API
function getInfoFromWiki (marker) {
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function(){
        alert("failed to get wikipedia resources");
    }, 5000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {
            marker.wikiPage = response[3][0];
            clearTimeout(wikiRequestTimeout);
        }
    });
}

// this viewModel is inspired by lesson 15, the Cat Clicker project
var ViewModel = function() {
    console.log(this);
    var self = this;
    
    this.locationList = ko.observableArray([]);
    
    myLocations.forEach(function (locationItem) {
		self.locationList.push(locationItem);
	});
    
    // for clicked location, it will open related infowindow
    self.clickedLocation = function(clickedItem) {
        populateInfoWindow(clickedItem.marker, clickedItem.infowindow);
        setAnimation(clickedItem.marker);
		};
    
    // to get the input from a user
    self.searchedText = ko.observable(""); 
    self.filteredLocations = ko.computed(function() {
        // to gather the matched location in an array
        var matchedLocation = [];
        for (var x = 0; x < myLocations.length; x++) {
            if (myLocations[x].name.toLowerCase().includes(self.searchedText()
                    .toLowerCase())) {
                markers[x].setVisible(true);
                matchedLocation.push(myLocations[x]);
            } else {
                markers[x].setVisible(false);
            }
        }
        return matchedLocation;
    });
};

// Error handling for google map
function mapError() {
    alert('Failed to load Google Map!!!\nPlease refresh the page, and try again!');
}