import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OfferService} from "@app/services/offer.service";

@Component({
  selector: 'app-view-offers-as-expeditor',
  templateUrl: './view-offers-as-expeditor.component.html',
  styleUrls: ['./view-offers-as-expeditor.component.css']
})
export class ViewOffersAsExpeditorComponent implements OnInit {

  idString = '';
  id: number|undefined;

  locPlecare: string | undefined = '';
  locSosire: string | undefined = '';
  dataPlecare: string | undefined = '';
  dataSosire: string | undefined = '';
  pretCamionGol: number | undefined;
  pretCamionPlin: number | undefined;
  detalii: string | undefined = '';

  idCamion: string | undefined = '';
  status: string | undefined = '';
  locatie: string | undefined = '';
  volum: number | undefined;
  gabarit: number | undefined;
  greutate: number | undefined;
  detaliiCamion: string | undefined = '';

  idUser: number | undefined;
  nameUser: string | undefined = '';
  emailUser: string | undefined = '';
  phoneUser: string | undefined = '';

  constructor(private router: Router,
              private offerService: OfferService) { }

  ngOnInit(): void {
    this.getIdByUrl(this.router.url);
    this.id = +this.idString;
    this.offerService.getOfferById(this.id).subscribe(res => {
      this.locPlecare = res.body?.locPlecare;
      this.locSosire = res.body?.locSosire;
      this.dataPlecare = new Date(res.body!.dataPlecare!).getDate().toString() + '-' +
        new Date(res.body!.dataPlecare!).getMonth() + '-' +
        new Date(res.body!.dataPlecare!).getFullYear();
      this.dataSosire = new Date(res.body!.dataSosire!).getDate().toString() + '-' +
        new Date(res.body!.dataSosire!).getMonth() + '-' +
        new Date(res.body!.dataSosire!).getFullYear();
      this.pretCamionGol = res.body?.pretCamionGol;
      this.pretCamionPlin = res.body?.pretCamionPlin;
      this.detalii = res.body?.detalii;

      this.idCamion = res.body?.camion?.id;
      this.status = res.body?.camion?.status;
      this.locatie = res.body?.camion?.locatie;
      this.volum = res.body?.camion?.volum;
      this.gabarit = res.body?.camion?.gabarit;
      this.greutate = res.body?.camion?.greutate;
      this.detaliiCamion = res.body?.camion?.detalii;

      this.idUser = res.body?.user?.id;
      this.nameUser = res.body?.user?.name;
      this.emailUser = res.body?.user?.email;
      this.phoneUser = res.body?.user?.phone;
    })
  }

  clickBack(): void {
    this.router.navigate(['/view-offers']);
  }

  clickReservation(): void {

  }

  getIdByUrl(url: string): void {
    let count = 0;
    for (let i = 0; i < url.length; i++) {
      if (url.charAt(i) === '/') {
        count++;
      }
      if (count === 3) {
        this.idString += url.charAt(i);
      }
      if (count === 2) {
        count = 3;
      }
    }
  }
}
