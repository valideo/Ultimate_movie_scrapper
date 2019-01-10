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
  currentLat : string;
  distanceRadius : number = 1500;
  currentLong : string;
  cinemas: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private provider: RestProvider) {
  }

  getUserPosition(){
    this.options = {
        enableHighAccuracy : true
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

      this.currentLat = pos["coords"].latitude.toString(); 
      this.currentLong = pos["coords"].longitude.toString();     
      this.loadCinemas(this.currentLat, this.currentLong);

      var circle = leaflet.circle([this.currentLat, this.currentLong], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.3,
      radius: this.distanceRadius,
      }).addTo(this.map);
      var circlePosition = leaflet.circleMarker([this.currentLat, this.currentLong], {
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.8,
      radius: 8
      }).addTo(this.map);
      circlePosition.bindPopup("Votre position");
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

  radiusChange(){
    console.log(this.distanceRadius);
    this.getUserPosition();

  }

  ionViewDidEnter(){
    console.log(this.distanceRadius);
    this.getUserPosition();
  }

  ionViewDidLeave(){
    if(this.map) {
      this.map.remove();
    }
  }

  loadCinemas(lat: string, lng: string){
    let position = lat+","+lng;
    let radius = this.distanceRadius.toString();
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
      this.map.setView([this.currentLat, this.currentLong], 10);
      this.map.addLayer(markerGroup);

    });;
  }
 

}
