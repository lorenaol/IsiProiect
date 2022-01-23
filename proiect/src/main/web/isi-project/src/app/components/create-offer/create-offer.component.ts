import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {OfferModel} from "../../models/offer.model";
import {Camion} from "@app/entities/camion";
import {CamionService} from "@app/services/camion.service";
import {User} from "@app/entities/user";
import {Offer} from "@app/entities/offer";
import {OfferService} from "@app/services/offer.service";

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  camion = new Camion();
  user = new User();
  offer = new Offer();
  createOfferDetailsForm = new FormGroup({
    dataPlecare: new FormControl(''),
    dataSosire: new FormControl(''),
    locPlecare: new FormControl(''),
    locSosire: new FormControl(''),
    pretGol: new FormControl(''),
    pretPlin: new FormControl(''),
    detalii: new FormControl('')
  });

  truckDetailsForm = new FormGroup({
    tip: new FormControl(''),
    volum: new FormControl(''),
    lungime: new FormControl(''),
    latime: new FormControl(''),
    inaltime: new FormControl(''),
    greutate: new FormControl(''),
    gabarit: new FormControl('')
  });

  constructor(private router: Router,
              private camionService: CamionService,
              private offerService: OfferService) { }

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

  clickMyOffers(): void {
    this.router.navigate(['/my-offers']);
  }

  addOfferClick(): void {
    this.camion.status = 'publicat';
    this.camion.locatie = this.createOfferDetailsForm.value.locPlecare;
    this.camion.volum = this.truckDetailsForm.value.volum;
    this.camion.gabarit = this.truckDetailsForm.value.gabarit;
    this.camion.greutate = this.truckDetailsForm.value.greutate;
    this.camion.detalii = 'Tip: ' + this.truckDetailsForm.value.tip +
      '; Lungime: ' + this.truckDetailsForm.value.lungime +
      '; Latime: ' + this.truckDetailsForm.value.latime +
      '; Inaltime: ' + this.truckDetailsForm.value.inaltime;
    let camion2 = new Camion();
    this.camionService.addCamion(this.camion).subscribe(res => {
      camion2.id = res.body?.id;
      camion2.detalii = res.body?.detalii;
      camion2.gabarit = res.body?.gabarit;
      camion2.greutate = res.body?.greutate;
      camion2.locatie = res.body?.locatie;
      camion2.status = res.body?.status;
      camion2.volum = res.body?.volum;

      this.offer.user = this.user;
      this.offer.camion = camion2;
      this.offer.locPlecare = this.createOfferDetailsForm.value.locPlecare;
      this.offer.locSosire = this.createOfferDetailsForm.value.locSosire;
      this.offer.dataPlecare = this.createOfferDetailsForm.value.dataPlecare;
      this.offer.dataSosire = this.createOfferDetailsForm.value.dataSosire;
      this.offer.pretCamionGol = this.createOfferDetailsForm.value.pretGol;
      this.offer.pretCamionPlin = this.createOfferDetailsForm.value.pretPlin;
      this.offer.detalii = this.createOfferDetailsForm.value.detalii;

      this.offerService.addOffer(this.offer).subscribe(res => {
        this.router.navigate(['/home']);
      });
    });


    console.log(this.camion);
  }

}
