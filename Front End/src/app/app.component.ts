import { Component, OnInit } from '@angular/core';
import { EventService } from './services/event.service';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
SwiperCore.use([
  Navigation,
  Pagination,
  Autoplay,
]);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular12';
  isLogedIn: boolean;

  constructor(
    private event: EventService
  ) {
    this.isLogedIn = false;
  }

  ngOnInit() {
    this.bindRootData();
  }


  bindRootData(): void {
    // DETECT USER IS ONLINE OR NOT
    this.event.isLogedin.subscribe((isLogedIn: boolean) => {
      this.isLogedIn = isLogedIn;
      if (isLogedIn) {
        // CALL A HTTP REQUEST FOR USER DETAILS


      }
    });
    // A STATUC DUMMY DATA IS ASSIGNED ON HOME PAGE

  }

}
