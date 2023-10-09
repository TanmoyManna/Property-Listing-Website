import { Component, OnInit } from '@angular/core';
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  SwiperOptions,
} from 'swiper';
SwiperCore.use([Navigation, Pagination, Autoplay]);
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from '@project/services/api.service';
import { EventService } from '@project/services/event.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  HomeSwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: true,
    pagination: false,
    scrollbar: false,
  };
  search : any = {
    keyword : '',
    status : ''
  }
  contactForm: FormGroup = new FormGroup({});
  constructor(private api: ApiService,
    private event: EventService,
    private router : Router,) { }

  ngOnInit(): void {
    this.formInit();
  }
  formInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      massage: new FormControl('', Validators.required),
    });
  }
  submitContact() {
    if (this.contactForm.valid) {
      const contactObj = {
        name: this.contactForm.controls.name.value,
        email: this.contactForm.controls.email.value,
        phone: this.contactForm.controls.phone.value,
        type: this.contactForm.controls.type.value,
        massage: this.contactForm.controls.massage.value,
      };
      this.api.post('wordsmithrealty/api/v1/contacts', contactObj).subscribe((result: any) => {
        console.log('Submit Data', result);

        if (result.status === 200) {
          this.api.alert(result.massage, 'success');
          this.contactForm.reset();
        } else {
          this.api.alert(result.message, 'warning');
        }
      },
        (err) => {
          this.api.alert(err, 'error');
        }
      );
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
  nagivateToListing(){
    console.log(this.search);
    this.event.setSearchEmmit(this.search)
    
    this.router.navigate(['/all-property'])
  }
  scrollTo(id : string){
    document?.getElementById(id)?.scrollIntoView();
  }
}
