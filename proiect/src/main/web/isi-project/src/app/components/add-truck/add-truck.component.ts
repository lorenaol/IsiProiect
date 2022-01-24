import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Camion} from "@app/entities/camion";
import {User} from "@app/entities/user";
import {FormControl, FormGroup} from "@angular/forms";
import {CamionService} from "@app/services/camion.service";

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.css']
})
export class AddTruckComponent implements OnInit {

  camion = new Camion();
  user = new User();

  truckDetailsForm = new FormGroup({
    tip: new FormControl(''),
    volum: new FormControl(''),
    lungime: new FormControl(''),
    latime: new FormControl(''),
    inaltime: new FormControl(''),
    greutate: new FormControl(''),
    gabarit: new FormControl(''),
    locatie: new FormControl('')
  });
  constructor(private router: Router,
              private camionService: CamionService) { }

  ngOnInit(): void {
    this.user.id = JSON.parse(localStorage.getItem('user')!).id;
    this.user.name = JSON.parse(localStorage.getItem('user')!).name;
    this.user.email = JSON.parse(localStorage.getItem('user')!).email;
    this.user.phone = JSON.parse(localStorage.getItem('user')!).phone;
    this.user.role = JSON.parse(localStorage.getItem('user')!).role;
    this.user.password = JSON.parse(localStorage.getItem('user')!).password;
  }

  addTruck(): void {
    this.camion.user = this.user;
    this.camion.status = 'publicat';
    this.camion.locatie = this.truckDetailsForm.value.locatie;
    this.camion.volum = this.truckDetailsForm.value.volum;
    this.camion.gabarit = this.truckDetailsForm.value.gabarit;
    this.camion.greutate = this.truckDetailsForm.value.greutate;
    this.camion.detalii = 'Tip: ' + this.truckDetailsForm.value.tip +
      '; Lungime: ' + this.truckDetailsForm.value.lungime +
      '; Latime: ' + this.truckDetailsForm.value.latime +
      '; Inaltime: ' + this.truckDetailsForm.value.inaltime;
    console.log(this.camion);
    this.camionService.addCamion(this.camion).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  clickBack(): void {
    this.router.navigate(['/my-trucks']);
  }
}
