import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  createOfferDetailsForm = new FormGroup({
    dataPlecare: new FormControl(''),
    dataSosire: new FormControl(''),
    locPlecare: new FormControl(''),
    locSosire: new FormControl(''),
    pretGol: new FormControl(''),
    pretPlin: new FormControl('')
  });

  truckDetailsForm = new FormGroup({
    tip: new FormControl(''),
    volum: new FormControl(''),
    lungime: new FormControl(''),
    latime: new FormControl(''),
    inaltime: new FormControl(''),
    greutate: new FormControl('')
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickMenu(): void {
    this.router.navigate(['/home']);
  }

  addOfferClick(): void {

  }

}
