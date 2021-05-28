

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.507351, lng: -0.127758},
    zoom:12,
  });



  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      
      handleLocationError(false, infoWindow, map.getCenter());
    }

  
  });
function markStore(storeInfo){

		// Create a marker and set its position.
		var marker = new google.maps.Marker({
			map: map,
			position: storeInfo.location,
			title: storeInfo.name
		});

		// show store info when marker is clicked
		marker.addListener('click', function(){
			showStoreInfo(storeInfo);
		});
	}

	// show store info in text box
	function showStoreInfo(storeInfo){
		var info_div = document.getElementById('info_div');
		info_div.innerHTML = 'Store name: '
			+ storeInfo.name
			+ '<br>Hours: ' + storeInfo.hours;
	}

	var stores = [
		{
			name: 'Store 1',
			location: {lat: 51.507351, lng: -0.127758 },
			hours: '8AM to 10PM'
		},
		{
			name: 'Store 2',
			location: {lat: 35.096290, lng: -89.739940 },
			hours: '9AM to 9PM'
		}
	];

        
         new MarkerClusterer(map, markers, {
    imagePath:"https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });
 }
   

stores.forEach(function(store){
	markStore(store);
});

