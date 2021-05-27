function initMap() {
	var myMapCenter = { lat: 51.507351, lng: -0.127758};

	// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
		center: myMapCenter,
		zoom: 14
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
		info_div.innerHTML = 'Class location: '
			+ storeInfo.name
            + '<br>Ability: ' + storeInfo.ability
            + '<br>Hours: ' + storeInfo.hours;
	}

	var stores = [
		{
			name: 'Store 1',
            location: {lat: 51.507351, lng: -0.127758 },
            ability: 'Adult Class',
			hours: '8AM to 10PM'
		},
		{
			name: 'Store 2',
			location: {lat: 51.692310, lng: -0.178690 },
			hours: '9AM to 9PM'
		}
	];

	stores.forEach(function(store){
		markStore(store);
	});
}
