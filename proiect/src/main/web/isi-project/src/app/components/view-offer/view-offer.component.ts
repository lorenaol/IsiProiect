import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OfferService} from "@app/services/offer.service";
import {Offer} from "@app/entities/offer";

@Component({
  selector: 'app-view-offer',
  templateUrl: './view-offer.component.html',
  styleUrls: ['./view-offer.component.css']
})
export class ViewOfferComponent implements OnInit {

  idString = '';
  id: number|undefined;
  offer?: Offer | null;

  locPlecare: string | undefined = '';
  locSosire: string | undefined = '';
  dataPlecare: string | undefined = '';
  dataSosire: string | undefined = '';
  pretCamionGol: number | undefined;
  pretCamionPlin: number | undefined;
  statusOferta: string | undefined = '';
  detalii: string | undefined = '';

  idCamion: string | undefined = '';
  status: string | undefined = '';
  locatie: string | undefined = '';
  volum: number | undefined;
  gabarit: number | undefined;
  greutate: number | undefined;
  detaliiCamion: string | undefined = '';

  constructor(private router: Router,
              private offerService: OfferService) { }

  ngOnInit(): void {
    this.getIdByUrl(this.router.url);
    this.id = +this.idString;
    this.offerService.getOfferById(this.id).subscribe(res => {
      this.offer = res.body;
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
      this.statusOferta = res.body?.status;
      this.detalii = res.body?.detalii;

      this.idCamion = res.body?.camion?.id;
      this.status = res.body?.camion?.status;
      this.locatie = res.body?.camion?.locatie;
      this.volum = res.body?.camion?.volum;
      this.gabarit = res.body?.camion?.gabarit;
      this.greutate = res.body?.camion?.greutate;
      this.detaliiCamion = res.body?.camion?.detalii;
    })

  }

  clickBack(): void {
    this.router.navigate(['/my-offers']);
  }

  clickSimilar(): void {
    this.router.navigate(['/suggestionsOff', this.id])
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
