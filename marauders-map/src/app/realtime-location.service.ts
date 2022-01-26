import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeatureCollection, GeoJson } from './models';

@Injectable({
  providedIn: 'root'
})
export class RealtimeLocationService {

  url = "https://maraudermap-7462f-default-rtdb.firebaseio.com/live-feed.json";

  public feed: GeoJson[] = [];

  constructor(private http: HttpClient) { }

  getMarkers() {
    const geoJson = [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': ['74.89564519960474', '32.69323212274529']
        },
        'properties': {
          'message': 'PP'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': ['74.843813', '32.724462' ]
        },
        'properties': {
          'message': 'Abhishek'
        }
      }
    ];
    return geoJson;
  }

  getLiveFeed() {
    /*this.http.get<GeoJson[]>(this.url).subscribe(
      (data: GeoJson[]) => {
        this.feed = data;
        return this.feed;
      }
    );*/
    return this.http.get<GeoJson[]>(this.url);
  }

  addUserLocation() {
    var data = new GeoJson([74.843813, 32.724462], {message : "Abhishek"});
    this.feed.push(data);
    this.http.put(this.url, this.feed).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
}
