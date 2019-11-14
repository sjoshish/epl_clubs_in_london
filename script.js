var map = L.map("map").setView([51.505615, -0.128598], 10) ;

var MyIcon = L.Icon.extend({
  options:{
    iconSize: [32,37],
  }
});

//images
var arsenal = new MyIcon({
  iconUrl: "https://logos-download.com/wp-content/uploads/2016/05/Arsenal_logo_crest_logotype.png"
});

var chelsea = new MyIcon({
  iconUrl: "https://vignette.wikia.nocookie.net/eswikia/images/b/bf/Chelsea.png/revision/latest?cb=20161017040256",
  iconSize : [45,47]
});

var westham = new MyIcon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg"
});

var tottenham = new MyIcon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg"
});

var fulham = new MyIcon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/en/e/eb/Fulham_FC_%28shield%29.svg"
});

var palace = new MyIcon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/en/0/0c/Crystal_Palace_FC_logo.svg"
});

//markers
var arsenal1 = L.marker([51.554702, -0.108342], {icon: arsenal}).addTo(map).bindPopup("Arsenal FC");

var chelsea1 = L.marker([51.481519, -0.190435], {icon: chelsea}).addTo(map).bindPopup("Chelsea FC");

var tottenham1 = L.marker([51.604272, -0.066392], {icon: tottenham}).addTo(map).bindPopup("Tottenham Hotspurs FC");

var palace1 = L.marker([51.398195, -0.085088], {icon: palace}).addTo(map).bindPopup("Crystal Palace FC");

var westham1 = L.marker([51.538117, -0.016548], {icon: westham}).addTo(map).bindPopup("West Ham United FC");

var fulham1 = L.marker([51.474721, -0.221640], {icon: fulham}).addTo(map).bindPopup("Fulham FC");

//London area
var circle = L.circle([51.505615, -0.128598],20000,{
  color: 'white',
  fillOpacity: 0
}).addTo(map)
  .bindPopup("<b><br>Welcome to London, UK</br></b><br>These are the London teams that compete in the English Premier League. Click on the logos for more details about the club.<b/r>")
.openPopup();

//Wembley Stadium
var polygon = L.polygon([
  [51.554807, -0.277116],
  [51.557775, -0.277240],
  [51.557775, -0.282244],
  [51.554807, -0.282555]

]).addTo(map).bindPopup("Wembley Stadium: This is the home of the England National Football Team")

//popup
var popup = L.popup();

function onMapClick(e){
  popup.setLatLng(e.latlng)
        .setContent("You clicked out of the greater London area at Coordinates: " + e.latlng.toString())
        .openOn(map); 
}
map.on('click', onMapClick);

//basemaps 
var CartoDB_DarkMatter = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 18
}).addTo(map);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  maxZoom: 18
});

var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

var Hydda_Full = L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var OpenMapSurfer_Roads = L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
	maxZoom: 20,
	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

//grouping clubs
var clubs = L.layerGroup([fulham1, chelsea1, tottenham1, palace1, westham1, arsenal1]);

var baseMaps = {
  Dark : CartoDB_DarkMatter,
  Satellite: Esri_WorldImagery,
  Stamen : Stamen_TonerLite ,
  Hydda : Hydda_Full,
  OpenMapSurfer: OpenMapSurfer_Roads
  
};

//layer control
var overlayMaps = {
    Clubs: clubs ,
};

L.control.layers(baseMaps,overlayMaps).addTo(map);

