import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealtimeLocationService } from '../realtime-location.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private realtimeLocationService: RealtimeLocationService,
     private router: Router) { }

  ngOnInit(): void {
    this.getLocation();
    //this.realtimeLocationService.addUserLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
        if (position) {
            console.log("Latitude: " + position.coords.latitude +", Longitude: " + position.coords.longitude);
            var data = { lat : position.coords.latitude, long : position.coords.longitude };
            localStorage.setItem('my-coordinate', JSON.stringify(data));
          }
        },
        (error: any) => console.log(error)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  gotoMap() {
    this.router.navigate(['map']);
  }

}
