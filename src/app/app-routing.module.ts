import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientsComponent } from './clients/clients.component';
import { FactoryComponent } from './factory/factory.component';
import { FormArrayComponent } from './form-array/form-array.component';
import { PopupComponent } from './popup/popup.component';

const routes: Routes = [
  {path:"clients" , component: ClientsComponent} ,
  {path:"client" , component: ClientComponent},
  {path:"EditClient" , component: ClientComponent},
  {path:"ADDClient" , component: ClientComponent},
  {path:"FormArray" , component: FormArrayComponent },
  {path:"popup" , component: PopupComponent },
  {path:"factory" , component: FactoryComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}