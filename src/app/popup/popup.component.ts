import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  corpname: any;
  corpForm!: FormGroup;

  constructor(public rout: Router, private matDialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public data: { length : number , options: any[] }) { }

  ngOnInit(): void {
    this.buildFormGroup();
    // console.log(this.data.length);
  }
  buildFormGroup() {
    this.corpForm = new FormGroup({
      crop: new FormControl(null, Validators.required),
      percentage: new FormControl(null, Validators.required)
    })
  }
  addCrop() {
    if (this.corpForm.valid)
      this.matDialogRef.close(this.corpForm.value);
  }
  perChangedHandler(count: any) {
    this.corpForm.controls['percentage'].setValue(count.percentage);

  }
  setCorp(event: any) {
    this.corpForm.controls['crop'].setValue((event.target.value));
  }
}
