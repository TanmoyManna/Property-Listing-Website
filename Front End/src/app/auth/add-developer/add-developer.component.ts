import { Component, OnInit } from '@angular/core';
import { ApiService } from '@project/services/api.service';
import { environment } from 'src/environments/environment';
import { StorageService } from '@project/services/storage.service';
import { EventService } from '@project/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { isEmpty } from 'underscore';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  SwiperOptions,
} from 'swiper';
SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-add-developer',
  templateUrl: './add-developer.component.html',
  styleUrls: ['./add-developer.component.scss']
})
export class AddDeveloperComponent implements OnInit { ImageUrl: String = environment.IMAGE_BASE_URL;
  developerForm: FormGroup = new FormGroup({});

  uploadedFiles: File[] = [];
  previewUploadedFiles: string[] = [];
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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private storage: StorageService,
    private event: EventService,
    private location: Location
  ) {
    
  }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.developerForm = new FormGroup({
      title: new FormControl('', Validators.required),
      images: new FormControl([]),
    });
  }


  createdeveloper(form: FormGroup) {
    this.BeforeSubmit(form).then((data: any) => {
      console.log(data);
      if (form.valid) {
        const formData = new FormData();

        formData.append('title', data.title);

        for (let i = 0; i < this.uploadedFiles.length; i++){
          formData.append(`images[${i}]`, this.uploadedFiles[i]);
        }
        

        this.api.postMultiDataWithToken('wordsmithrealty/api/v1/developers', formData).subscribe((result: any) => {
              console.log('Submit Data', result);

              if (result.status === 200) {
                this.api.alert(result.massage, 'success');
                //this.location.back();
                this.developerForm.reset();
                this.previewUploadedFiles = [];
                window.location.reload();
                //this.router.navigate(['/home'])
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


  Back() {
    // this.location.back();
    this.router.navigate(['/home'])
  }

  // when files are selected, save them in array uploadedFiles
  fileAdded(event: Event) {
    const inputValue = event.target as HTMLInputElement;
    if (inputValue.files && inputValue.files.length > 0) {
      for (let i = 0; i < inputValue.files.length; i++) {
        this.uploadedFiles.push(<File>inputValue.files[i]);
        this.developerForm.get('images')?.value.push(<File>inputValue.files[i]);
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
    }
  }
  // To delete selected files
  deleteFiles(index: number) {
    this.uploadedFiles.splice(index, 1);
    this.previewUploadedFiles.splice(index, 1);
  }


}
