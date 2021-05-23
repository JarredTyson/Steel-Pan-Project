 function initMap(){
            var map = new google.maps.Map(document.getElementById("map"), {
                zoom: 3,
                center: {
                    lat: 46.619261,
                    lng: -33.134766
                }
            });
        

            var labels= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            var locations = [
                {lat: 51.507351, lng: -0.127758 },
                {lat: 35.096290, lng: -89.739940 },
                {lat: 51.692310, lng: -0.178690 },
                {lat: 51.372360, lng: -0.100400 },
                {lat: 51.568712, lng: -0.102706 },
                {lat: 51.652299, lng: -0.080711 },
                {lat: 51.546483, lng: -0.129350 },
                {lat: 40.754932, lng: -73.984016 },
                {lat: 40.754932, lng: -73.984016 }


            ];
            var markers= locations.map(function(location,i){
                return new google.maps.Marker({
                    position:location,
                    label: labels[i % labels.length]
                 });
            });
        
        
         new MarkerClusterer(map, markers, {
    imagePath:"https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });
 }
    let map, infoWindow;