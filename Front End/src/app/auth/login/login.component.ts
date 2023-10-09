import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@project/services/api.service';
import { StorageService } from '@project/services/storage.service';
import { EventService } from '@project/services/event.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private api: ApiService,
    private storage: StorageService,
    private event: EventService,) {
  }

  ngOnInit(): void {
  }
  login(email: any, passWord: any) {
    console.log(email);
    console.log(passWord);
    if (email && passWord) {
      let data = {
        email: email,
        password: passWord,
      };
      this.api.post('wordsmithrealty/api/v1/auth/signin', data).subscribe(
        (res: any) => {
          console.log(res, 'hi');
          if (res.status === 200) {
            this.api.alert("Login succesfully", 'success');

            let data = {
              token: res.data.accesstoken,
              id: res.data._id,
              name: res.data.name,
              userType: res.data.userType,
            };
            console.log(data);
            
            this.storage.setUser(data);
            this.event.setLoginEmmit(true);
            this.router.navigate(['/auth/add-property']);
          } else {
            this.api.alert(res.message, 'warning');
          }
        },
        (err) => {
          this.api.alert('Something went wrong', 'error');
        }
      );
    } else {
      this.api.alert("Please enter the credentials", 'warning');
    }
  }

}
