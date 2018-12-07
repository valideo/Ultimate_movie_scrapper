import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestProvider {

  apiSearchMovieUrl = "http://www.omdbapi.com/?apikey=75522b56&type=movie&s=";
  apiSearchSerieUrl = "http://www.omdbapi.com/?apikey=75522b56&type=series&s=";
  apiGetMediaUrl = "http://www.omdbapi.com/?apikey=75522b56&i=";
  pageParameter = "&page=";

  constructor(public http: HttpClient) {
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
}
