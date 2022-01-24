import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Request} from "@app/entities/request";
import {User} from "@app/entities/user";
import {RequestService} from "@app/services/request.service";

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  cerere = new Request();
  user = new User();
  createRequestDetailsForm = new FormGroup({
    locPlecare: new FormControl(''),
    dataPlecare: new FormControl(''),
    dataMaximaPlecare: new FormControl(''),
    locSosire: new FormControl(''),
    dataSosire: new FormControl(''),
    dataMaximaSosire: new FormControl(''),
    tipMarfa: new FormControl(''),
    masa: new FormControl(''),
    volum: new FormControl(''),
    buget: new FormControl(''),
    detalii: new FormControl('')
  });

  selected: 'Mobila' | undefined;

  constructor(private router: Router,
              private requestService: RequestService) { }

  ngOnInit(): void {
    this.user.id = JSON.parse(localStorage.getItem('user')!).id;
    this.user.name = JSON.parse(localStorage.getItem('user')!).name;
    this.user.email = JSON.parse(localStorage.getItem('user')!).email;
    this.user.phone = JSON.parse(localStorage.getItem('user')!).phone;
    this.user.role = JSON.parse(localStorage.getItem('user')!).role;
    this.user.password = JSON.parse(localStorage.getItem('user')!).password;
  }

  clickMenu(): void {
    this.router.navigate(['/home']);
  }

  clickMyRequests(): void {
    this.router.navigate(['/my-requests']);
  }

  addRequestClick(): void {
    this.cerere.user = this.user;
    this.cerere.locPlecare = this.createRequestDetailsForm.value.locPlecare;
    this.cerere.locSosire = this.createRequestDetailsForm.value.locSosire;
    this.cerere.tipMarfa = this.selected;
    this.cerere.dataPlecare = this.createRequestDetailsForm.value.dataPlecare;
    this.cerere.dataMaximaPlecare = this.createRequestDetailsForm.value.dataMaximaPlecare;
    this.cerere.dataSosire = this.createRequestDetailsForm.value.dataSosire;
    this.cerere.dataMaximaSosire = this.createRequestDetailsForm.value.dataMaximaSosire;
    this.cerere.masa = this.createRequestDetailsForm.value.masa;
    this.cerere.buget = this.createRequestDetailsForm.value.buget;
    this.cerere.volum = this.createRequestDetailsForm.value.volum;
    this.cerere.detalii = this.createRequestDetailsForm.value.detalii;
    this.cerere.status = 'in asteptare';
    console.log(this.cerere);

    this.requestService.addRequest(this.cerere).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
