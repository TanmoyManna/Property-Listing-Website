import { Component, OnInit } from '@angular/core';
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  SwiperOptions,
} from 'swiper';
SwiperCore.use([Navigation, Pagination, Autoplay]);
import { ApiService } from '@project/services/api.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '@project/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ImageUrl: String = environment.IMAGE_BASE_URL;

  HomeSwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: true,
    pagination: false,
    scrollbar: false,
  };
  FeatureSwiper: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 10,
    navigation: true,
    pagination: false,
    scrollbar: true,
  };
  Property: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 10,
    navigation: true,
    pagination: false,
    scrollbar: true,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // when window width is >= 480px
      767: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      1023: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      1439: {
        slidesPerView: 3,
        spaceBetween: 30
      },
    }
    
  };
  developerList: any[] = [];

  featuredPropertyList: any[] = [];
  featuredparams: HttpParams = new HttpParams();
  featuredpricing: string = 'Sell';

  signaturePropertyList: any[] = [];
  signatureparams: HttpParams = new HttpParams();
  signaturepricing: string = 'Sell';

  search : any = {
    keyword : '',
    status : ''
  }

  contactForm: FormGroup = new FormGroup({});
  constructor(private api: ApiService,
    private router : Router,
    private event: EventService) {
    this.formInit();
  }

  ngOnInit(): void {
    this.getFeatureDeveloper();
    this.getFeaturedPropertyList();
    this.getSignaturePropertyList();
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

  getFeaturedPropertyList() {
    this.featuredparams = this.featuredparams.set('builderType', 'Feature');
    this.featuredparams = this.featuredparams.set('pricing', this.featuredpricing);
    this.api.get('wordsmithrealty/api/v1/properties', this.featuredparams).subscribe((res: any) => {
      if (res.status === 200) {
        this.featuredPropertyList = res.allProperties;
        console.log('shopping--->', this.featuredPropertyList);
      }
    });
  }
  changeFeaturedPricing(value: string) {
    this.featuredpricing = value;
    this.featuredparams = this.featuredparams.set('pricing', this.featuredpricing);
    this.getFeaturedPropertyList()
  }

  getSignaturePropertyList() {
    this.signatureparams = this.signatureparams.set('builderType', 'Signature');
    this.signatureparams = this.signatureparams.set('pricing', this.signaturepricing);
    this.api.get('wordsmithrealty/api/v1/properties', this.signatureparams).subscribe((res: any) => {
      if (res.status === 200) {
        this.signaturePropertyList = res.allProperties;
        console.log('shopping--->', this.signaturePropertyList);
      }
    });
  }
  changeSignaturePricing(value: string) {
    this.signaturepricing = value;
    this.signatureparams = this.signatureparams.set('pricing', this.signaturepricing);
    this.getSignaturePropertyList()
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

  scrollTo(id : string){
    document?.getElementById(id)?.scrollIntoView();
  }

  nagivateToListing(){
    console.log(this.search);
    this.event.setSearchEmmit(this.search)
    
    this.router.navigate(['/all-property'])
  }
}


