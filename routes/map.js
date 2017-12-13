<>
var map ;
var latLng ;

function initMap() {
  latlng = {lat: 36.364012, lng: 127.345083};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: latlng
  }); 
                
}

setInterval(()=>{      
request('http://dry-hollows-74138.herokuapp.com/bus/testGps/A',(data)=>{
let ret = JSON.parse(data.data);
if(this.latLng.lat()!==ret.lati&&this.latLng.lng()!==ret.longti)
{    
console.log('성공');
this.addMarker(ret.lati, ret.longti);

}




}).catch((e)=>{

console.log("failg");
});


},1000);

function  addMarker(lati,longti){

latLng =new google.maps.LatLng(lati,longti); 

let marker = new google.maps.Marker({
 map: map,
 animation: google.maps.Animation.DROP,
 position: latLng
});

let content = "<h4>it is trace!</h4>";         

this.addInfoWindow(marker, content);

}

function addInfoWindow(marker, content){

let infoWindow = new google.maps.InfoWindow({
 content: content
});    

}