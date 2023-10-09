import { Component, OnInit } from '@angular/core';
import { ApiService } from '@project/services/api.service';
@Component({
  selector: 'app-contact-submits',
  templateUrl: './contact-submits.component.html',
  styleUrls: ['./contact-submits.component.scss']
})
export class ContactSubmitsComponent implements OnInit {
  contactSubmits: any[] = [];
  modalData: any;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getContactSubmits();
  }
  getContactSubmits() {
    this.api.get('wordsmithrealty/api/v1/contacts').subscribe((res: any) =>{
      if (res.status === 200) {
        this.contactSubmits = res.allContact;
        console.log('shopping--->', this.contactSubmits);        
      }
    });
  }
  deleteContactSubmits(id:string){
    console.log(id);
    this.api.delete(`wordsmithrealty/api/v1/contacts/${id}`).subscribe((res: any) =>{
      if (res.status === 200) {
        console.log('shopping--->', res);       
        this.api.alert(res.message, 'success');
        this.getContactSubmits();
      }
    });
  }
  openEditModal(item :any){
    console.log(item);
    this.modalData = {...item};
    document.getElementById('modalDiscount').classList.add("show");
    document.getElementById('modalDiscount').style.display = "block";
  }
  closeEditModal(){
    document.getElementById('modalDiscount').classList.remove("show");
    document.getElementById('modalDiscount').style.display = "none";
  }

  submitEditModal(){
    console.log(this.modalData);   
    this.api.put(`wordsmithrealty/api/v1/contacts/${this.modalData._id}`,this.modalData).subscribe((res: any) =>{
      console.log(res);
      
      if (res.status === 200) {    
        this.api.alert(res.message, 'success');
        this.closeEditModal();
        this.getContactSubmits();
      }
    }); 
  }
}
