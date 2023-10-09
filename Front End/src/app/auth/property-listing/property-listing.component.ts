import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '@project/services/api.service';
import { environment } from 'src/environments/environment';
import { StorageService } from '@project/services/storage.service';
@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.scss']
})
export class PropertyListingComponent implements OnInit {
  ImageUrl: String = environment.IMAGE_BASE_URL;
  propertyList: any;
  pricing: string = 'Sell';
  params: HttpParams = new HttpParams();
  userData: any;
  constructor(private api: ApiService,
    private storage: StorageService,) {
    this.userData = this.storage.getUser();
  }

  ngOnInit(): void {
    this.getPropertyList();
  }

  getPropertyList() {
    this.api.get('wordsmithrealty/api/v1/users/properties',this.params).subscribe((res: any) =>{
      if (res.status === 200) {
        this.propertyList = res.allProperties;
        console.log('shopping--->', this.propertyList);        
      }
    });
  }
  changePricing(value : string){
    this.pricing = value;
    this.params  = this.params.set('pricing', this.pricing);
    this.getPropertyList()
  }

  deleteProperty(id:string){
    console.log(id);
    this.api.delete(`wordsmithrealty/api/v1/properties/${id}`).subscribe((res: any) =>{
      console.log('shopping--->', res);
      if (res.status === 200) {
        console.log('shopping--->', res);       
        this.api.alert(res.message, 'success');
        this.getPropertyList();
      }
    });
  }
}
