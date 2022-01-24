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
  myTrucks: Camion[] | null | undefined;
  id: number|undefined;

  createOfferDetailsForm = new FormGroup({
    dataPlecare: new FormControl(''),
    dataSosire: new FormControl(''),
    locPlecare: new FormControl(''),
    locSosire: new FormControl(''),
    pretGol: new FormControl(''),
    pretPlin: new FormControl(''),
    detalii: new FormControl('')
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
    this.camionService.getTrucksByUserId(this.user?.id).subscribe(res => {
      this.myTrucks = res.body;
      console.log(this.myTrucks);
    })
  }

  clickMenu(): void {
    this.router.navigate(['/home']);
  }

  clickMyOffers(): void {
    this.router.navigate(['/my-offers']);
  }

  clickTruck(truck: Camion): void {
    // this.router.navigate(['/view-truck', truck.id]);
    this.camionService.getTrucksById(truck.id).subscribe(res => {
      this.offer.user = this.user;
      this.offer.camion = res?.body;
      this.offer.locPlecare = this.createOfferDetailsForm.value.locPlecare;
      this.offer.locSosire = this.createOfferDetailsForm.value.locSosire;
      this.offer.dataPlecare = this.createOfferDetailsForm.value.dataPlecare;
      this.offer.dataSosire = this.createOfferDetailsForm.value.dataSosire;
      this.offer.pretCamionGol = this.createOfferDetailsForm.value.pretGol;
      this.offer.pretCamionPlin = this.createOfferDetailsForm.value.pretPlin;
      this.offer.detalii = this.createOfferDetailsForm.value.detalii;
      this.offer.status = 'in asteptare';

      this.offerService.addOffer(this.offer).subscribe(res => {
        this.router.navigate(['/home']);
      });

      console.log(this.camion);
    });
  }

}
