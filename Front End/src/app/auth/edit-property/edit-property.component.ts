import { Component, OnInit } from '@angular/core';
import { ApiService } from '@project/services/api.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { isEmpty } from 'underscore';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER, I } from '@angular/cdk/keycodes';
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  SwiperOptions,
} from 'swiper';
SwiperCore.use([Navigation, Pagination, Autoplay]);
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit {
  ImageUrl: String = environment.IMAGE_BASE_URL;
  propertyId: any;
  params: HttpParams = new HttpParams();
  propertyDetails: any;
  propertyForm: FormGroup = new FormGroup({});

  uploadedFiles: File[] = [];
  previewUploadedFiles: string[] = [];
  showUploadedImages: string[] = [];

  Amenities: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];


  // notepad editor start
  config: AngularEditorConfig = {
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    toolbarHiddenButtons: [['bold'], ['unlink', 'insertImage', 'insertVideo']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };
  // Swiper congif
  imageSwiper: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: true,
    pagination: false,
    scrollbar: false,
  };
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,) {
    this.route.params.subscribe((query: any) => {
      console.log('RESP--->', query);
      this.params = this.params.set('id', query.id);
      this.propertyId = query.id;
    });
  }

  ngOnInit(): void {
    this.formInit();
    this.getPropertyDetails();
  }
  formInit(): void {
    this.propertyForm = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      images: new FormControl([]),
      description: new FormControl('', Validators.required),
      fullAddress: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      videoLink: new FormControl('', Validators.required),
      amenities: new FormControl([]),
      useCase: new FormControl('', Validators.required),
      builderType: new FormControl('', Validators.required),
      rooms: new FormControl(''),
      bedRooms: new FormControl(''),
      bathRooms: new FormControl(''),
      propertyType: new FormControl('', Validators.required),
      garages: new FormControl(''),
      basements: new FormControl(''),
      areaInFT: new FormControl('', Validators.required),
      pricing: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }
  getPropertyDetails() {
    this.api.get('wordsmithrealty/api/v1/properties', this.params).subscribe((res: any) => {
      if (res.status === 200) {
        this.propertyDetails = res.allProperties[0];
        console.log('shopping--->', this.propertyDetails);

        // To patch values
        this.propertyForm.patchValue(this.propertyDetails);

        // To patch unmatched keys        
        this.showUploadedImages = this.propertyDetails.images;
        this.propertyForm.patchValue({ fullAddress : this.propertyDetails.address});
        this.propertyForm.patchValue({ areaInFT : this.propertyDetails.propertyArea});
        this.propertyDetails.amenities.forEach((element : any) => {
          this.Amenities.push(element)
        });
      }
    });
  }

  updateProperty(form: FormGroup) {
    this.BeforeSubmit(form).then((data: any) => {
      console.log(data);
      if (form.valid) {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('price', data.price);

        for (let i = 0; i < this.uploadedFiles.length; i++) {
          formData.append(`newimages[${i}]`, this.uploadedFiles[i]);
        }

        if(this.showUploadedImages.length>0){
          for (let i = 0; i < this.showUploadedImages.length; i++) {
            formData.append(`oldimages[${i}]`, this.showUploadedImages[i]);
          }
        }else{
          formData.append(`oldimages[${0}]`, "null");
        }
        

        formData.append('description', data.description);

        formData.append('address', data.fullAddress);
        formData.append('country', data.country);
        formData.append('state', data.state);
        formData.append('city', data.city);
        formData.append('area', data.area);
        formData.append('videoLink', data.videoLink);
        for (let i = 0; i < data.amenities.length; i++) {
          formData.append(`amenities[${i}]`, data.amenities[i]);
        }

        formData.append('useCase', data.useCase);
        formData.append('builderType', data.builderType);
        formData.append('propertyType', data.propertyType);

        if (data.useCase == 'Residental') {
          formData.append('rooms', data.rooms);
          formData.append('bedRooms', data.bathRooms);
          formData.append('bathRooms', data.bathRooms);
        }

        if (data.useCase == 'Commercial') {
          formData.append('garages', data.garages);
          formData.append('basements', data.basements);
        }

        formData.append('propertyArea', data.areaInFT);
        formData.append('pricing', data.pricing);
        formData.append('status', data.status);



        this.api.putMultiDataWithToken(`wordsmithrealty/api/v1/properties/${this.propertyId}`, formData).subscribe((result: any) => {
          console.log('Submit Data', result);

          if (result.status === 200) {
            this.api.alert(result.massage, 'success');
            this.propertyForm.reset();
            this.showUploadedImages = [];
            this.router.navigate(['/auth/property-listing']);           
          } else {
            this.api.alert(result.message, 'warning');
          }
        },
          (err) => {
            this.api.alert(err, 'error');
          }
        );
      } else {
        form.markAllAsTouched();
      }
    });
  }
  BeforeSubmit(form: FormGroup): Promise<void> {
    return new Promise((resolve) => {
      Object.keys(form.value).forEach((x) => {
        if (
          typeof form.controls[x].value === 'string' &&
          !isEmpty(form.controls[x].value)
        ) {
          form.controls[x].setValue(form.controls[x].value.trim());
        }
      });
      resolve(form.value);
    });
  }


  // Add mat Chips
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.Amenities.push(value);
      this.propertyForm.get('amenities')?.value.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }
  // Remove mat Chips
  remove(index: number): void {
    //const index = this.Amenities.indexOf(fruit);
    if (index >= 0) {
      this.Amenities.splice(index, 1);
      this.propertyForm.get('amenities')?.value.splice(index, 1);
    }
  }
  // when files are selected, save them in array uploadedFiles
  fileAdded(event: Event) {
    console.log(this.uploadedFiles);
    console.log(this.previewUploadedFiles);
    
    const inputValue = event.target as HTMLInputElement;
    if (inputValue.files && inputValue.files.length > 0) {
      for (let i = 0; i < inputValue.files.length; i++) {
        this.uploadedFiles.push(<File>inputValue.files[i]);
        if (
          inputValue.files[i].type === 'image/jpeg' ||
          inputValue.files[i].type === 'image/png' ||
          inputValue.files[i].type === 'image/jpg'
        ) {
          const reader = new FileReader();
          reader.readAsDataURL(inputValue.files[i]);
          reader.onload = () => {
            this.previewUploadedFiles.push(reader.result as string);
          };
        }
      }
      console.log(this.uploadedFiles);
      console.log(this.previewUploadedFiles);
    }
  }
  // To delete selected files
  deleteFiles(index: number) {
    this.uploadedFiles.splice(index, 1);
    this.previewUploadedFiles.splice(index, 1);
    console.log(this.uploadedFiles);
    console.log(this.previewUploadedFiles);
  }
  deleteFiles2(index: number) {
    this.showUploadedImages.splice(index, 1);
  }



  //number only mask
  numberOnly(event: any): boolean {
    //console.log(event)
    const charCode = event.which ? event.which : event.keyCode;
    if (
      charCode > 46 &&
      (charCode < 48 || charCode > 57) &&
      (charCode < 96 || charCode > 105)
    ) {
      return false;
    }
    return true;
  }
}
