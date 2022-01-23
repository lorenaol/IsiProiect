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
  detalii: string | undefined = '';

  idCamion: string | undefined = '';
  status: string | undefined = '';
  locatie: string | undefined = '';
  volum: string | undefined = '';
  gabarit: number | undefined;
  greutate: number | undefined;
  detaliiCamion: string | undefined = '';

  constructor(private router: Router,
              private offerService: OfferService) { }

  ngOnInit(): void {
    this.getIdByUrl(this.router.url);
    this.id = +this.idString;
    this.offerService.getOfferById(this.id).subscribe(res => {
      this.locPlecare = res.body?.locPlecare;
      this.locSosire = res.body?.locSosire;
      this.dataPlecare = res.body?.dataPlecare;
      this.dataSosire = res.body?.dataSosire;
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
    })

  }

  clickBack(): void {
    this.router.navigate(['/my-offers']);
  }

  clickSimilar(): void {

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
