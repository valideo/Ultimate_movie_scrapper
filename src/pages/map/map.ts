import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';

declare var google;
let map: any;
let infowindow: any;
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapContainer: ElementRef;
  options : GeolocationOptions;
  distanceRadius : number = 1500;
  bounds : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private platform: Platform) {
    platform.ready().then(() => {
      this.getGeolocation();
    });
  }

    getGeolocation() {

    if(this.platform.is('core') || this.platform.is('mobileweb')) {
      navigator.geolocation.getCurrentPosition((location) => {
        console.log(location);
        this.initMap(location.coords.latitude, location.coords.longitude);
      }, (error) => {
        console.log(error);
      }, options);

      } else {
        
      this.options = {
          enableHighAccuracy : true
      };
      this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
          console.log(pos);
          this.initMap(pos["coords"].latitude, pos["coords"].longitude);
        },(err : PositionError)=>{
          console.log("error : " + err.message);
      });
      }
    }

    initMap(latG :any, lngG : any){
      this.bounds = new google.maps.LatLngBounds();
      map = new google.maps.Map(this.mapContainer.nativeElement, {
        center: {lat: latG, lng: lngG},
        zoom: 13
      });

      var SearchCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: {lat: latG, lng: lngG},
        radius: this.distanceRadius
      });
  
      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: {lat: latG, lng: lngG},
        radius: this.distanceRadius,
        type: ['movie_theater']
      }, (results,status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            this.createMarker(results[i]);
          }
        }
      });
    }

    createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: placeLoc
      });
      var placeLatLng = new google.maps.LatLng(placeLoc.lat, placeLoc.lng);
      this.bounds.extend(placeLatLng);
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }

  ionViewWillEnter(){
  }

  radiusChange(){
    this.bounds = null;
    this.getGeolocation();
    map.fitBounds(this.bounds);
  }


  ionViewDidLeave(){
  }
 
}
