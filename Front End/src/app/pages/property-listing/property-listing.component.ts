import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@project/services/api.service';
import { environment } from 'src/environments/environment';
import { EventService } from '@project/services/event.service';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  SwiperOptions,
} from 'swiper';
SwiperCore.use([Navigation, Pagination, Autoplay]);
@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.scss']
})
export class PropertyListingComponent implements OnInit {
  HomeSwiper: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: true,
    pagination: false,
    scrollbar: false,
  };
  ImageUrl: String = environment.IMAGE_BASE_URL;
  pageTitle : string = '';
  filter: string = '';
  propertyList: any[] = [];
  originalPropertyList: any[] = [];
  useCase: string;
  builderType: string;
  pricing: string = 'Sell';
  params: HttpParams;

  perPage : number = 6;
  search : any = {
    keyword : '',
    status : ''
  }
  contactForm: FormGroup = new FormGroup({});
  constructor(private router : Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private event: EventService){
      if( this.router.url.includes('commercial-property')){
        this.useCase = 'Commercial';
        this.pageTitle = 'Commercial'
      }else if( this.router.url.includes('residental-property')){
        this.useCase = 'Residental';
        this.pageTitle = 'Residental'
      }
     
      this.filter = this.activatedRoute.snapshot.queryParamMap.get('type');
      console.log(this.filter);

      if( this.filter == 'Featured-Property'){
        this.builderType = 'Feature'
        this.pageTitle += ' Featured'
      }else if( this.filter == 'Signature-Developments'){
        this.builderType = 'Signature'
        this.pageTitle += ' Signature'
      }

      this.params = new HttpParams();
      if(!this.router.url.includes('all-property')){
        this.params  = this.params.set('useCase', this.useCase);
      }      
      this.params  = this.params.set('pricing', this.pricing);
      if(this.builderType){
        this.params  = this.params.set('builderType', this.builderType);
      }      
      
      this.event.isSearched.subscribe((res:any)=>{
        console.log(res);        
        if(res.keyword){
          this.search.keyword = res.keyword;
          this.params  = this.params.set('keyword', res.keyword);
        }
        if(res.status){
          this.search.status = res.status;
          this.params  = this.params.set('status', res.status);
        }
      })

     }

  ngOnInit(): void {
    this.getPropertyList();
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
  getPropertyList() {
    this.api.get('wordsmithrealty/api/v1/properties',this.params).subscribe((res: any) =>{
      if (res.status === 200) {
        this.originalPropertyList = res.allProperties;
        this.propertyList = this.originalPropertyList.slice(0,this.perPage);
        console.log('shopping--->', this.propertyList);        
      }
    });
  }
  showMore(){
    this.perPage += 3;
    this.propertyList = this.originalPropertyList.slice(0,this.perPage);
  }

  changePricing(value : string){
    this.pricing = value;
    this.params  = this.params.set('pricing', this.pricing);
    this.getPropertyList()
  }

  applySearch(){
    if(this.search.keyword){
      this.params  = this.params.set('keyword', this.search.keyword);
    }
    if(this.search.status){
      this.params  = this.params.set('status', this.search.status);
    }
    this.getPropertyList();
  }
  restSearch(){
    this.search.keyword = '';
    this.search.status = '';
    this.params = this.params.delete('keyword');
    this.params = this.params.delete('status');
    this.getPropertyList();
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
  openContacttModal(){
    document.getElementById('modalDiscount').classList.add("show");
    document.getElementById('modalDiscount').style.display = "block";
  }
  closeContactModal(){
    document.getElementById('modalDiscount').classList.remove("show");
    document.getElementById('modalDiscount').style.display = "none";
  }
  scrollTo(id : string){
    document?.getElementById(id)?.scrollIntoView();
  }

}
