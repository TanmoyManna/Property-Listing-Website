import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '@project/services/event.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoggedIn: any = false;

  constructor(private router : Router,
    private event: EventService,) {
    this.event.isLogedin.subscribe((res: any) => {
      console.log(res);
      this.isLoggedIn = res;
    });
   }

  ngOnInit(): void {
  }
}
