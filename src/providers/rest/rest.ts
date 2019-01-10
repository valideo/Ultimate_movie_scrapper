import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http'

@Injectable()
export class RestProvider {

  apiSearchMovieUrl = "http://www.omdbapi.com/?apikey=75522b56&type=movie&s=";
  apiSearchSerieUrl = "http://www.omdbapi.com/?apikey=75522b56&type=series&s=";
  apiGetMediaUrl = "http://www.omdbapi.com/?apikey=75522b56&i=";
  pageParameter = "&page=";
  apiGoogleCinemasUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=movie_theater&key=AIzaSyDOAfd61JdNRe92ZgNU0N4DRJL3pDhp-9k&location=";

  constructor(public http: HttpClient, public httpNatif: HTTP) {
  }

  searchMovieByKey(keyword : string, page : string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiSearchMovieUrl+keyword+this.pageParameter+page).subscribe(data => {
        resolve(data['Search']);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  searchSerieByKey(keyword : string, page : string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiSearchSerieUrl+keyword+this.pageParameter+page).subscribe(data => {
        resolve(data['Search']);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  getMediaById(id : string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiGetMediaUrl+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  getSeasonByNumber(id : string, season : string) {
    return new Promise(resolve => {
      this.http.get(this.apiGetMediaUrl+id+"&Season="+season).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getEpisodeByNumber(id : string, season : string, episode : string) {
    return new Promise(resolve => {
      this.http.get(this.apiGetMediaUrl+id+"&Season="+season+"&Episode="+episode).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getCinemasByLocation(position : string, radius : string) {
    let distance = "&radius="+radius;
    return new Promise(resolve => {
      console.log(this.apiGoogleCinemasUrl+position+distance);
      this.http.get(this.apiGoogleCinemasUrl+position+distance).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
