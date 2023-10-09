import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '@project/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-developer-listing',
  templateUrl: './developer-listing.component.html',
  styleUrls: ['./developer-listing.component.scss']
})
export class DeveloperListingComponent implements OnInit {
  ImageUrl: String = environment.IMAGE_BASE_URL;
  developerList: any;
  constructor(private api: ApiService,) { }

  ngOnInit(): void {
    this.getDeveloperList();
  }
  getDeveloperList() {
    this.api.get('wordsmithrealty/api/v1/developers').subscribe((res: any) =>{
      if (res.status === 200) {
        this.developerList = res.allDevelopers;
        console.log('shopping--->', this.developerList);        
      }
    });
  }
  deleteDevelopers(id:string){
    console.log(id);
    this.api.delete(`wordsmithrealty/api/v1/developers/${id}`).subscribe((res: any) =>{
      console.log('shopping--->', res);
      if (res.status === 200) {
        console.log('shopping--->', res);       
        this.api.alert(res.message, 'success');
        this.getDeveloperList();
      }
    });
  }
}
