import { Component, OnInit } from '@angular/core';
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  SwiperOptions,
} from 'swiper';
SwiperCore.use([Navigation, Pagination, Autoplay]);
import { EventService } from '@project/services/event.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from '@project/services/api.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  ImageUrl: String = environment.IMAGE_BASE_URL;
  search: any = {
    keyword: '',
    status: ''
  }
  contactForm: FormGroup = new FormGroup({});
  FeatureSwiper: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 10,
    navigation: true,
    pagination: false,
    scrollbar: true,
  };
  HomeSwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: true,
    pagination: false,
    scrollbar: false,
  };
  developerList: any;
  constructor(private event: EventService,
    private router: Router,
    private api: ApiService,) { }

  ngOnInit(): void {
    this.getFeatureDeveloper();
    this.formInit();
  }
  // To get the feature developers
  getFeatureDeveloper() {
    this.api.get('wordsmithrealty/api/v1/developers').subscribe((res: any) => {
      if (res.status === 200) {
        this.developerList = res.allDevelopers;
        console.log('shopping--->', this.developerList);
      }
    });
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
          this.closeContactModal();
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
  openContacttModal() {
    document.getElementById('modalDiscount').classList.add("show");
    document.getElementById('modalDiscount').style.display = "block";
  }
  closeContactModal() {
    document.getElementById('modalDiscount').classList.remove("show");
    document.getElementById('modalDiscount').style.display = "none";
  }
  scrollTo(id: string) {
    document?.getElementById(id)?.scrollIntoView();
  }

  nagivateToListing() {
    console.log(this.search);
    this.event.setSearchEmmit(this.search)

    this.router.navigate(['/all-property'])
  }

}
