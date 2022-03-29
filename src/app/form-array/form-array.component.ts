import { Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})

export class FormArrayComponent implements OnInit {

  addcrop!: any;
  isDisabled: boolean = false;
  num! : number ;

  constructor(private matDialog: MatDialog, private fb: FormBuilder) { }
  ngOnInit(): void {
  }

  openDialog() {
    if (this.crops.length< 4) {
      const opt = { data: { length: (this.crops.length + 1), options: ['قمح', 'برتقال', 'تفاح', 'ذرة'] } };
      this.crops.controls.forEach(item => {
        if (opt.data.options.includes(item.value['crop'])) {
          const index = opt.data.options.findIndex(itemIndex => itemIndex == item.value['crop']);
          opt.data.options.splice(index, 1);
        }
      });
      const dialog = this.matDialog.open(PopupComponent, opt);
      dialog.afterClosed().subscribe(res => this.addCrop(res));
      // console.log(this.crops.value);
    }
  }

  form = this.fb.group({
    crops: this.fb.array([
      new FormGroup ({ 
        crop : new FormControl("قمح" , Validators.required),
        percentage : new FormControl(100 , Validators.required),
     })
    ])
  });

  get crops(): FormArray {
    return this.form.controls["crops"] as FormArray;
  }
  addCrop(cropForm: any) {
    this.addcrop = this.fb.group({
      crop: [cropForm['crop'], Validators.required],
      percentage: [cropForm['percentage'], Validators.required]
    });
    this.crops.push(this.addcrop);
    this.calculate( cropForm);
  }
 
  calculate( event: any) {
    console.log("event" , event);
    // this.crops.controls.forEach((item, i) => {
      let index = this.crops.controls.findIndex(perIndex => perIndex.value['crop'] == event['crop']);
      if(this.crops.length == 1){
        event['percentage'] = 100;
        event['crop'] = 'قمح';
      }
      // num= index;
      // if (i != index) {
        switch (this.crops.length) {
          case 2: {
            console.log('case 2');
            if (event['percentage'] == 100) {
                this.crops.patchValue([
                  { percentage: 0},{ percentage: 100},
                ]);
            }
            if (event['percentage'] == 75) {
              if(index == 0){
                this.crops.patchValue([
                  { percentage: 75},{ percentage: 25},
                ]);
              }
              if(index == 1){
                this.crops.patchValue([
                  { percentage: 25},{ percentage: 75},
                ]);
              }
            }
            if (event['percentage'] == 50) {
                this.crops.patchValue([
                  { percentage: 50},{ percentage: 50},
                ]);
            }
            if (event['percentage'] == 25) {
              if(index == 0){
                this.crops.patchValue([
                  { percentage: 25},{ percentage: 75},
                ]);
              }
              if(index == 1){
                this.crops.patchValue([
                  { percentage: 75},{ percentage: 25},
                ]);
              }
            }
            if (event['percentage'] == 0) {
              if(index == 0){
                this.crops.patchValue([
                  { percentage: 0},{ percentage: 100},
                ]);
              }
            }
            // console.log("old", item.value['percentage']);
            break;
          }
          case 3: {
            console.log('case 3');
            if (event['percentage'] == 75) {
              if(index == 1){
                this.crops.patchValue([
                  { percentage: 0},{ percentage: 75},{ percentage: 25},
                ]);
              }
              if(index == 2){
                this.crops.patchValue([
                  { percentage: 0},{ percentage: 25},{ percentage: 75},
                ]);
              }
            }
            if (event['percentage'] == 50) {
              if(index == 0){
                this.crops.patchValue([
                  { percentage: 50},{ percentage: 25},{ percentage: 25},
                ]);
              }
              if(index == 1){
                this.crops.patchValue([
                  { percentage: 25},{ percentage: 50},{ percentage: 25},
                ]);
              }
              if(index == 2){
                this.crops.patchValue([
                  { percentage: 25},{ percentage: 25},{ percentage: 50},
                ]);
              }
            }
            if (event['percentage'] == 25) {
              if(index == 0){
                this.crops.patchValue([
                  { percentage: 25 },{ percentage: 25 },{ percentage: 50 },
                ]);
              }
              if(index == 1){
                this.crops.patchValue([
                  { percentage: 25},{ percentage: 25},{ percentage: 50},
                ]);
              }
              if(index == 2){
                this.crops.patchValue([
                  { percentage: 25},{ percentage: 50},{ percentage: 25},
                ]);
              }
            }
            if (event['percentage'] == 0){
              if(index == 0){
                this.crops.patchValue([
                  { percentage: 0},{ percentage: 50},{ percentage: 50},
                ]);
              }
            }
            break;
          }
          case 4: {
            console.log('case 4');
            if (event['percentage'] == 50) {
              if(index == 1){
                this.crops.patchValue([
                  { percentage:0},{ percentage: 50},
                  { percentage:  25},{ percentage:  25},
                ]);
              }
              if(index == 2){
                this.crops.patchValue([
                  { percentage:  0},{ percentage:   25},
                  { percentage: 50},{ percentage:   25},
                ]);
              }
              if(index == 3){
                this.crops.patchValue([
                  { percentage:0 },{ percentage:25},
                  { percentage: 25},{ percentage:50},
                ]);
              }
              // console.log('this is form ', this.form.value)
            }
            if (event['percentage'] == 25) {
              this.crops.patchValue([
                { percentage: event['percentage']},{ percentage: event['percentage']},
                { percentage: event['percentage']},{ percentage: event['percentage']},
              ]);
            }
            if (event['percentage'] == 0) {
              this.crops.patchValue([
                { percentage: event['percentage']},{ percentage: 25}, 
                { percentage: 25}, { percentage: 50},
              ]);
            }
            break;
          }
        }
    //   }
    // }
    // );
    console.log('this is form ', this.form.value);
  }

  trackByMethod(index: number, item: any) {
    return item.value['crop'];
  } // I commented the trackBy: trackByMethod in view 
  // we track the value which it did'nt change = 'crop'
  //  if we track the 'percentage' it will calculate error 

  deleteByIndex(lessonIndex: number) {
    this.crops.removeAt(lessonIndex);
    const item = this.crops.at(lessonIndex - 1);
    this.calculate(item.value);
  }
}














// 1006282642
// 8/1400
// 1072954652
// 8/1411
// 1024894956
// 11/1397












  // item.value['percentage'] // old // i 
  // this.addcrop.value['percentage'] // new // index
  // event['percentage'] // new

        // let len = 100 - Number(event['percentage']); // len 

      // console.log("length = " , opt.data.length);

   // this.crops.at(0).setValue({ percentage: 0 , crop: item.value['crop'] })
   // this.crops.at(1).setValue({ percentage: len, crop: item.value['crop'] })
          
   // item.setValue({ percentage: len - 75 , crop: item.value['crop'] });

      // console.log("this is from crops", item.value['percentage']);
      // console.log("this is from addcrop", this.addcrop.value['percentage']);

  // let len3 = 100 - (Number(this.addcrop.value['percentage']) + len); // len3
      // let divlen3 = Math.abs(len3 / 100);
      // debugger
      // const sublen3 = 74.75 - divlen3;
      // console.log("this is 3 ", sublen3);
      // let len4 = 100 - (this.addcrop.value['percentage'] + len + len3); // len4
      // let divlen4 = Math.abs(len4);
      // const sublen4 = (divlen4 - 7450) / 10000;
      // console.log("this is 4 ", sublen4);

  // item.value['percentage'] = len - 25;
            // eng
            // if (len == 75) {
            //   item.setValue({ percentage: 25, crop: item.value['crop'] });
            //   len -= 25;
            // } else {
            //   item.setValue({ percentage: len, crop: item.value['crop'] });
            // }
            // item.setValue({ percentage: divlen3, crop: item.value['crop'] });
            // console.log("old", item.value['percentage']);