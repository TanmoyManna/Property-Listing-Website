import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EventService } from '@project/services/event.service';
import { StorageService } from '@project/services/storage.service';
import { ApiService } from '@project/services/api.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  activeUrl : string;
  isLoggedIn: any;

  constructor(private router : Router,
    private storage: StorageService,
    private event: EventService,
    private api: ApiService){
    if( this.router.url.includes('commercial-property')){
      this.activeUrl = 'commercial-property'
    }else if( this.router.url.includes('residental-property')){
      this.activeUrl = 'residental-property'
    }else{
      this.activeUrl = this.router.url;
    }
    this.event.isLogedin.subscribe((res: any) => {
      console.log(res);
      this.isLoggedIn = res;
    });
   }

  ngOnInit(): void {
  }

  toggle(){
    let mobileHeader = document.getElementById('navbarCollapse');
    if(mobileHeader.classList.contains("collapse")){
      mobileHeader.classList.remove("collapse");
      mobileHeader.classList.add("show")
    }else if(mobileHeader.classList.contains("show")){
      mobileHeader.classList.remove("show");
      mobileHeader.classList.add("collapse")
    }    
  }

  Logout() {
    this.storage.clearUser();
    this.event.setLoginEmmit(false);
    this.api.alert("Successfully Logged Out", 'success');
    window.location.reload();
  }
}
