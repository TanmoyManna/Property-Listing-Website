import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@project/services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '@project/services/storage.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  constructor(private router: Router,
    private api: ApiService,
    private storage: StorageService,) {
  }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*(\+[a-zA-Z0-9-]+)?@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ])
    });
  }

  submit() {
    console.log(this.registerForm.valid);
    
    if (this.registerForm.valid) {
      let data = {
        name: this.registerForm.controls.name.value,
        email: this.registerForm.controls.email.value,
        phone: this.registerForm.controls.phone.value,
        password: this.registerForm.controls.password.value,
      };
      this.api.post('wordsmithrealty/api/v1/auth/signup', data).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status) {
            this.registerForm.reset();
            this.api.alert(res.message, 'success');
            const data = {
              token: res.data.token,
              id: res.data._id,
            };
            this.storage.setUser(data);
            this.router.navigate(['/auth/login']);
          } else {
            this.api.alert('Account Created Successfully', 'warning');
          }
        },
        (err) => {
          this.api.alert('Something went wrong', 'error');
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
