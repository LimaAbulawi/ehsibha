import { FormGroup } from '@angular/forms';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'percentage-btn',
  templateUrl: './percentage-btn.component.html',
  styleUrls: ['./percentage-btn.component.scss']
})
export class PercentageBtnComponent implements OnInit {

  // dis:any = true ;
  radio: any;
  crops: any = [100, 75, 50, 25, 0];
  @Input() selectedperc!: any;
  @Input() crop!: string;
  @Input() index!: any;
  @Output() perChanged: EventEmitter<any> = new EventEmitter();
  @Input() length!: any;
  isHidden: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  disableAndEnable(value: number) {
    if (this.length == 1 && value != 100) {
      return true
    } else if (this.length == 2) {
      if (this.index == 0 && value == 100) {
        return true;
      }
      if (this.index == 1 && value == 0) {
        return true;
      }
    } else if (this.length == 3) {
      if (this.index == 0 && (value == 100 || value == 75)) {
        return true;
      }
      if (this.index == 1 && (value == 0 || value == 100)) {
        return true;
      }
      if (this.index == 2 && (value == 0 || value == 100)) {
        return true;
      }
    }
    else if (this.length == 4) {
      if (this.index == 0 && (value == 100 || value == 75 || value == 50)) {
        return true;
      }
      if (this.index == 1 && (value == 0 || value == 75 || value == 100)) {
        return true;
      }
      if (this.index == 2 && (value == 0 || value == 75 || value == 100)) {
        return true;
      }
      if (this.index == 3 && (value == 0 || value == 75 || value == 100)) {
        return true;
      }
    }
    return false
  }

  hidDiv(value: number) {
    if (this.length == 2 && (this.index == 1 && value == 0)) {
      return true;
    } else if (this.length == 3) {
      if (this.index == 1 && value == 0) {
        return true;
      }
      if (this.index == 2 && value == 0) {
        return true;
      }
    }else if (this.length == 4) {
      if (this.index == 1 && value == 0) {
        return true;
      }
      if (this.index == 2 && value == 0) {
        return true;
      }
      if (this.index == 3 && value == 0) {
        return true;
      }
    }
    return false;
  }

  radioChanged(event: any) {
    this.selectedperc = event.target.value;
    this.perChanged.emit({ percentage: this.selectedperc, crop: this.crop });
    // , index : this.index
  }
}





















// HiddenAndEnable(value: number) {
  //   if (this.length == 2 && (this.index == 1 && value == 0)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // [hidden]="HiddenAndEnable(crop)" // in html in  <input type="radio" ... [hidden]="HiddenAndEnable(crop)" >