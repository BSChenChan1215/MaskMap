
var map = L.map('map', {
    center: [24.1438564,120.6670826],
    zoom: 16,
    
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var localIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [35, 51],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

var markers = new L.MarkerClusterGroup().addTo(map);;

var xhr = new XMLHttpRequest();
xhr.open("get","https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json");
xhr.send();
xhr.onload = function(){
 var data = JSON.parse(xhr.responseText).features
 for(let i =0;data.length>i;i++){
  var mask;
 if(data[i].properties.mask_adult == 0){
   mask = redIcon;
 }else{
   mask = greenIcon;
 } markers.addLayer(L.marker([data[i].geometry.coordinates[1],data[i].geometry.coordinates[0]], {icon: mask}).bindPopup('<h1>'+data[i].properties.name+'</h1>'+'<p>成人口罩數量'+data[i].properties.mask_adult+'</p>'));
// add more markers here...
  // L.marker().addTo(map)
  //   )
 }
 map.addLayer(markers);
}
function getLocalData(){
    var localdata = [
    {'name':'台中教育大學',
    'address': '403台中市西區民生路140號',
    'phone':'04 2218 3199',
    lat:24.1438564,
    lng:120.6670826}, 

    ]
    L.marker([localdata[0].lat,localdata[0].lng], {icon: localIcon}).addTo(map)
      .bindPopup('<h1>'+ localdata[0].name +'</h1>'+'<h1>'+ localdata[0].address +'</h1>'+'<h1>'+ localdata[0].phone +'</h1>')
}

getLocalData()




