import { init } from "./cone";

function angleFromCoordinate(lat1, lon1, lat2, lon2) {
  var dLon = ((lon2 - lon1) * Math.PI) / 180;
  var y = Math.sin(dLon) * Math.cos(lat2);
  var x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  return (Math.atan2(y, x) * 180) / Math.PI;
}

function showPosition(position) {
  var current = new google.maps.LatLng(
    position.coords.latitude,
    position.coords.longitude
  );

  // random goal location to show rotation
  // var goal = new google.maps.LatLng(33.8688, -85.2195);
  var goal = new google.maps.LatLng(
    Math.random() * 180 - 90,
    Math.random() * 360 - 180
  );

  var angle = angleFromCoordinate(
    current.lat(),
    current.lng(),
    goal.lat(),
    goal.lng()
  );
  console.log("Current location:", current.lat(), current.lng());
  console.log("Goal location:", goal.lat(), goal.lng());
  console.log("Angle to goal:", angle);
  init(angle);
}

function showError(error) {
  console.log("getCurrentPosition returned error", error);
}

var intervalId = window.setInterval(async function () {
  await navigator.geolocation.getCurrentPosition(showPosition, showError);
}, 500);
