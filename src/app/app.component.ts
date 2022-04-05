import { environment } from './../environments/environment';
import { FormArrayComponent } from './form-array/form-array.component';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ehsibha';
  constructor(private translate: TranslateService) {
    // translate.setDefaultLang('en');

    console.log("production : ", environment.production);
    console.log("test : ", environment.test);
    console.log("dev : ", environment.development);
  }
  changeLang(e: any) {
    console.log(e.target.value);
    this.translate.use(e.target.value);
  }
}