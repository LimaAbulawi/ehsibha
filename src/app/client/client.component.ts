import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { DbservicesService } from '../services/dbservices.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  form!: FormGroup;
  isDisabled = false;
  client!: any;
  isShown: boolean = false; // hidden by default 
  isAdd: boolean = false; // shown by default 
  h: boolean = false //

  // cur = parseInt(this.client.a.evaluationCurrency) ;
  //  x: string="";
  //  y:number = 0;

  constructor(private dbservices: DbservicesService, private activatedToute: ActivatedRoute) { }

  ngOnInit() {
    this.check();
  }
  
  async getClient() {
    var id = this.activatedToute.snapshot.queryParams['empId'];
    this.dbservices.getApprisalByID(id).subscribe((res: any) => {
      this.client = res[0];
      this.buildFormGroup();
      console.log(this.client);
    }, error => { });

    // const res: any = await this.dbservices.getApprisalByID(id).toPromise();
    // this.client = res[0]
    // this.buildFormGroup();
  }
  cur: string = "";
  num: number = 0;

  buildFormGroup() {
    var id = this.activatedToute.snapshot.queryParams['empId'];

    this.form = new FormGroup({
      clientName: new FormControl({ value: this.client ? this.client.a.clientName : null, disabled: this.isDisabled }, Validators.required),
      assignmentDate: new FormControl({ value: this.client ? this.client.a.assignmentDate : null, disabled: this.isDisabled }, Validators.required),
      evaluationPurpose: new FormControl({ value: this.client ? this.client.a.evaluationPurpose : null, disabled: this.isDisabled }, Validators.required),
      evaluationCurrency: new FormControl({ value: this.client ? this.client.a.evaluationCurrency : null, disabled: this.isDisabled }, Validators.required),
      evaluationReportName: new FormControl({ value: this.client ? this.client.a.evaluationReportName : null, disabled: this.isDisabled }, Validators.required),
      surveyDate: new FormControl({ value: this.client ? this.client.a.surveyDate : null, disabled: this.isDisabled }, Validators.required),
      professionalismStandards: new FormControl({ value: this.client ? this.client.a.professionalismStandards : null, disabled: this.isDisabled }, Validators.required),
      status: new FormControl({ value: this.client ? this.client.a.status : null, disabled: this.isDisabled }, Validators.required),
      evaluationDate: new FormControl({ value: this.client ? this.client.a.evaluationDate : null, disabled: this.isDisabled }, Validators.required),
      refNumber: new FormControl({ value: this.client ? this.client.a.refNumber : null, disabled: this.isDisabled }, Validators.required),
      independenceEndorsement: new FormControl({ value: this.client ? this.client.a.independenceEndorsement : null, disabled: this.isDisabled }, Validators.required),
      SpAppraisalId: new FormControl({ value: Number(id), disabled: this.isAdd })
    });
  }

  check() {
    if (this.activatedToute.snapshot.routeConfig?.path === "client") {
      this.isDisabled = true;
      this.getClient();
      this.h = true;

    } else if (this.activatedToute.snapshot.routeConfig?.path === "EditClient") {
      this.isDisabled = false;
      this.isShown = !this.isShown;
      this.getClient();
      this.h = false;
    }
    else if (this.activatedToute.snapshot.routeConfig?.path === "ADDClient") {
      this.buildFormGroup();
      this.isAdd = true;
      this.h = false;

    }
  }

  edit() {
    // console.log(this.form.touched, this.form.statusChanges, this.form.valueChanges);
    if (this.form.valid) {
      this.dbservices.editById(this.form.value).subscribe((res: any) => {
        this.client = res[0];
      })
    }else {
      this.form.markAllAsTouched();
    }
  }

  ADDNew() {
    if (this.form.valid) {
      this.dbservices.ADDNewAP(this.form.value).subscribe((res: any) => {
        this.client = res;
      })
      // this.x = this.client.a.evaluationCurrency;
      // this.y = +this.x;
      // console.log(this.y);
    }else {
      this.form.markAllAsTouched();
    }
  }

  setCurrency(event: any) {
    this.form.controls['evaluationCurrency'].setValue(Number(event.target.value))
  }

  setStatus(event: any) {
    this.form.controls['status'].setValue(Number(event.target.value));
  }

  get clientFormControl() {
    return this.form.controls;
  }

}