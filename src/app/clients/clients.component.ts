import { Component, OnInit } from '@angular/core';
import { DbservicesService } from '../services/dbservices.service';
import { Router } from '@angular/router';


@Component({
  selector: 'clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: any = [];

  constructor(private dbservices: DbservicesService, public rout: Router) {
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.dbservices.getAll().subscribe(res => { this.clients = res; });
  }

  View(id: number) {
    this.rout.navigate(['client'], {queryParams:{ empId: id }})
  }
  Edit(id: number) {
    this.rout.navigate(['EditClient'], {queryParams:{ empId: id }})
  }

  check(){
   
  }
  
  // getclient(clientt){
  //   this.dbservices.getApprisalByID(clientt).subscribe(res => { this.clients = res; });
  // }
}