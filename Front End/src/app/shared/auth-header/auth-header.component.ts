import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '@project/services/event.service';
import { StorageService } from '@project/services/storage.service';
import { ApiService } from '@project/services/api.service';
@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss']
})
export class AuthHeaderComponent implements OnInit {
  activeUrl: string;
  isAdmin: any = false;
  constructor(private router: Router,
    private storage: StorageService,
    private event: EventService,
    private api: ApiService,) {
      this.event.isLogedin.subscribe((res: any) => {
        console.log(res);
        if(res){
          let userData = this.storage.getUser();
          if(userData.userType!='USER'){
            this.isAdmin = true;
          }
        }
      });
      
  }

  ngOnInit(): void {
  }
  toggle() {
    let mobileHeader = document.getElementById('navbarCollapse');
    if (mobileHeader.classList.contains("collapse")) {
      mobileHeader.classList.remove("collapse");
      mobileHeader.classList.add("show")
    } else if (mobileHeader.classList.contains("show")) {
      mobileHeader.classList.remove("show");
      mobileHeader.classList.add("collapse")
    }
  }

  Logout() {
    this.storage.clearUser();
    this.event.setLoginEmmit(false);
    this.api.alert("Successfully Logged Out", 'success');
    this.router.navigate(['/home']);
  }
}
