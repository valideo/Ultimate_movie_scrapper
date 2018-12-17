import { RestProvider } from './../../providers/rest/rest';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  options : GeolocationOptions;
  currentPos : Geoposition;
  cinemas: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private provider: RestProvider) {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
    console.log(data);
    });
  }

  getUserPosition(){
    this.options = {
        enableHighAccuracy : true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;      
        console.log(pos);

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    });
}

  ionViewWillEnter(){
    this.loadmap();
  }
 
  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      minZoom: 4,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoidmFsaWRlbyIsImEiOiJjanBzZ2xzZjMwOXczM3hudng1b3V0enVjIn0.2DXYgwTjMW911f3UPJBLAw'
    }).addTo(this.map);
  }

  ionViewDidEnter(){
    this.getUserPosition();
    this.loadCinemas();
    var circle = leaflet.circle([45.768200, 4.867350], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.3,
      radius: 1500
  }).addTo(this.map);

  var circlePosition = leaflet.circleMarker([45.768200, 4.867350], {
    color: 'blue',
    fillColor: 'blue',
    fillOpacity: 0.8,
    radius: 8
}).addTo(this.map);
circlePosition.bindPopup("Votre position");


this.map.setView([45.768200, 4.867350], 18);
  }

  ionViewDidLeave(){
    if(this.map) {
      this.map.remove();
    }
  }

  loadCinemas(){
    let position = "45.768200,4.867350";
    let radius = "1500"
    let markerGroup = leaflet.featureGroup();
    this.provider.getCinemasByLocation(position, radius)
    .then(data => {
      this.cinemas = data['results'];
      this.cinemas.forEach(element => {
        let lat = element.geometry.location.lat;
        let lng = element.geometry.location.lng;
        let name = element.name;
        let address = element.vicinity;
        let marker: any = leaflet.marker([lat, lng]);
        marker.bindPopup("<h3>"+name+"</h3><div>"+address+"</div>");
        markerGroup.addLayer(marker);
      });
      this.map.addLayer(markerGroup);

    });;
  }
 

}
