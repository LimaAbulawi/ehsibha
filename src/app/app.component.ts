import { environment } from './../environments/environment';
import { FormArrayComponent } from './form-array/form-array.component';
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ehsibha';
  constructor() {
    console.log( "production : ", environment.production);
    console.log( "test : ", environment.test);
    console.log( "dev : ", environment.development);
  }
}