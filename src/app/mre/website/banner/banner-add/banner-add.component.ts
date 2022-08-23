import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { BannerModule } from '../banner.module';
import { BannerService } from '../banner.service';

@Component({
  selector: 'app-banner-add',
  templateUrl: './banner-add.component.html',
  styleUrls: ['./banner-add.component.scss']
})
export class BannerAddComponent implements OnInit {
  @Input() data;
  newForm
  file: File;
  imgPath;
  formType=false;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toaster: TranslatedToastrService,
    private bannerService: BannerService
  ) { }

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
      title: [this.data.title,Validators.required],
      sub_title: [this.data.sub_title,Validators.required],
      description: [this.data.description,Validators.required],
      image:[] 
    })
    this.formType = this.data.addForm
    this.imgPath = this.data.image;
  }

  fileChangeEvent(event: any): void {
    this.file = event.target.files[0];
  }


  onFormSubmit() {
    if (this.newForm.valid) {
      const data = new FormData();
      const { title, sub_title, description } = this.newForm.value;
      data.append('title', title);
      data.append('sub_title', sub_title);
      data.append('description', description);
      data.append('avatar', this.file);
      data.append('id',this.data.id)

      this.activeModal.close(data)
    }
  }


  closeModal() {
    this.activeModal.close();
  }

}
