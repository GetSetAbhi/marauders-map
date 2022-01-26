import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { RealtimeLocationService } from '../realtime-location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title = 'testmap';
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/araina97/ckytyelm8000e14nwnajl90d5';
  lat = 32.726601;
  lng = 74.857025;
  accessToken = "pk.eyJ1IjoiYXJhaW5hOTciLCJhIjoiY2t5dHd5Z2prMGlydTJybzhyNHJlcW1tMiJ9.SxLx0CUuX-bxAGxtbhOX1A";

  constructor(private markerService: RealtimeLocationService) {
  }

  ngOnInit(): void {

    this.map = new mapboxgl.Map({
        accessToken: this.accessToken,
        container: 'map',
        style: this.style,
        zoom: 12,
        center: [this.lng, this.lat]
    });

    this.map.on('load', () => {

      this.map?.addSource('customMarker', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });
      const markers = this.markerService.getLiveFeed().subscribe(
        (markers) => {
          const data: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
            type: 'FeatureCollection',
            // @ts-ignore
            features: markers
          };
          console.log("#############");
          console.log(markers);
          const source:mapboxgl.GeoJSONSource = this.map?.getSource('customMarker') as mapboxgl.GeoJSONSource;
          source.setData(data);

          this.map?.addLayer({
            id: 'customMarketid',
            source: 'customMarker',
            type: 'symbol',
            layout: {
              'text-field': '{message}',
              'text-size': 24,
              'text-transform': 'uppercase',
              'icon-image': 'pitch',
              'icon-size': 2,
              'text-offset': [0, 1]
            },
            paint: {
              'text-color': '#000000',
            }
          });


        }
      );



    });

    var jsonCoord = localStorage.getItem('my-coordinate');
    if (jsonCoord != null || jsonCoord != "") {
      // @ts-ignore
      jsonCoord = JSON.parse(jsonCoord);
      console.log(jsonCoord);

      const marker1 = new mapboxgl.Marker()
        // @ts-ignore
        .setLngLat([jsonCoord.long, jsonCoord.lat])
        .addTo(this.map);
    }

  }

}
