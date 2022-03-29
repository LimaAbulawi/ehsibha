import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, timeout } from 'rxjs';
import { fromEvent } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
export class FactoryComponent implements OnInit {

  form!: FormGroup;
  Avocado: any = 0;
  Glass: any = 0;
  flour: any = 0;
  juiceStart: any;
  bridStart: any;

  constructor() { }

  ngOnInit(): void {
    // this.calculate();
    this.buildFormGroup();
  }

  glass() {
    this.Glass += 10;
    console.log("Glass", this.Glass);
  }
  avocado() {
    this.Avocado += 10;
    console.log("avocado", this.Avocado);
  }
  juice() {
    if (this.Avocado == 500 && this.Glass == 200) {
      // let startJ = document.getElementById('startJ');//.innerHTML= "start juice";
      // if (startJ) {
      //   startJ.innerHTML = "start juice"
      // }
      this.form.controls['startJ'].setValue("start juice");
      console.log("start juice")
    }
  }
  brid() {
    this.flour += 10;
    console.log("flour", this.flour);
  }
  calculate() {
    const seconds = interval(500);
    let glassTimer = seconds.pipe(timeInterval())
      .subscribe(
        value => {
          this.glass();
          if (this.Glass == 200) {
            this.juice();
            glassTimer.unsubscribe();
          }
        },
        err => console.log(err),
      )
    let avocadoTimer = seconds.pipe(timeInterval())
      .subscribe(
        value => {
          this.avocado();
          if (this.Avocado == 500) {
            avocadoTimer.unsubscribe();
            this.juice();
          }
        },
        err => console.log(err),
      )
    let flourTimer = seconds.pipe(timeInterval())
      .subscribe(
        value => {
          this.brid();
          if (this.flour == 1000) {
            flourTimer.unsubscribe();
            console.log("start brid");
            // document.getElementById('startB').innerHTML= "start Brid";
            this.form.controls['startB'].setValue("start Brid")
          }
        },
        err => console.log(err),
      )
  }
  buildFormGroup() {
    this.form = new FormGroup({
      startJ: new FormControl('', Validators.required),
      startB: new FormControl('', Validators.required),
    });
  }
}
