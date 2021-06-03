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
            name: 'Central London Class',
            location: {lat: 51.507351, lng: -0.127758 },
            ability: 'Intermediate Adult Class',
            Day: 'Monday',
			hours: '8PM to 10PM'
		},
		{
			name: 'Potters Bar Class',
            location: {lat: 51.692310, lng: -0.178690 },
            ability: 'Beginner Children Class',
            Day: 'Wednesday',
			hours: '5:30PM to 7:00PM'
        },
        {
			name: 'Hornchurch Class',
            location: {lat: 51.562330, lng: -0.218640 },
            ability: 'Intermediate Adult Class',
            Day: 'Thursday',
            hours: '7PM to 8PM'
        },
        {
			name: 'Lewisham Class',
            location: {lat: 51.441545, lng: -0.011745 },
            ability: 'Improv Class',
            Day: 'Saturday',
			hours: '6PM to 9PM'
        },
        {
			name: 'Wembley Class',
            location: {lat: 51.550509, lng: -0.304807 },
            ability: 'Beginner 14/18 Class',
            Day: 'Thursday',
			hours: '9AM to 9PM'
        },
        {
			name: 'Forrest Gate',
            location: {lat: 51.692310, lng: -0.026435 },
            ability: 'Experienced Adults',
            Day: 'Friday',
			hours: '9AM to 9PM'
        },
        {
			name: 'Edmonton Class',
            location: {lat: 51.624234, lng: -0.060467 },
            ability: 'Sunday',
            Day: 'Monday',
			hours: '9AM to 9PM'
        },
        {
			name: 'Chingford',
            location: {lat: 51.632134, lng: -0.007465 },
            ability: 'Beginner Seniors',
            Day: 'Monday',
			hours: '9AM to 9PM'
		}
	];

	stores.forEach(function(store){
		markStore(store);
	});
}
