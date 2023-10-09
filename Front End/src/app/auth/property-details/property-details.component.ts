import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@project/services/api.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
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
import { DomSanitizer } from '@angular/platform-browser';
import { StorageService } from '@project/services/storage.service';
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
  HomeSwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: true,
    pagination: false,
    scrollbar: false,
  };
  ImageUrl: String = environment.IMAGE_BASE_URL;
  propertyId: any;
  params: HttpParams = new HttpParams();
  propertyDetails: any;
  contactForm: FormGroup = new FormGroup({});
  similarProperties: any;
  safeURL: any;
  userData: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private storage: StorageService,
    private _sanitizer: DomSanitizer) {
    this.route.params.subscribe((query: any) => {
      console.log('RESP--->', query);
      this.params = this.params.set('id', query.id);
      this.propertyId = query.id;
    });
    this.userData = this.storage.getUser();
  }

  ngOnInit(): void {
    this.formInit();
    this.getPropertyDetails();
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
  getPropertyDetails() {
    this.api.get('wordsmithrealty/api/v1/properties', this.params).subscribe((res: any) => {
      if (res.status === 200) {
        this.propertyDetails = res.allProperties[0];
        this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.propertyDetails.videoLink);
        console.log('shopping--->', this.propertyDetails);
        this.getSimilarProperties();
      }
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
  getSimilarProperties() {
    let params: HttpParams = new HttpParams();
    params = params.set('propertyType', this.propertyDetails.propertyType);
    this.api.get('wordsmithrealty/api/v1/properties',params).subscribe((res: any) => {
      if (res.status === 200) {
        this.similarProperties = res.allProperties.slice(0,3);
        console.log('Similar--->', this.similarProperties);
      }
    });
  }
  markActive(){
    const formData = new FormData();
    formData.append('isActive', "ACTIVE");
    this.api.putMultiDataWithToken(`wordsmithrealty/api/v1/properties/${this.propertyId}`, formData).subscribe((result: any) => {
      console.log('Submit Data', result);

      if (result.status === 200) {
        this.api.alert("This Property has been marked as Active", 'success');
        this.router.navigate(['/auth/property-listing']);         
      } else {
        this.api.alert(result.message, 'warning');
      }
    },
      (err) => {
        this.api.alert(err, 'error');
      }
    );
  }
}
