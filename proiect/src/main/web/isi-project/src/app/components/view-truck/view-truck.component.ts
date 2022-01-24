import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CamionService} from "@app/services/camion.service";
import {Offer} from "@app/entities/offer";

@Component({
  selector: 'app-view-truck',
  templateUrl: './view-truck.component.html',
  styleUrls: ['./view-truck.component.css']
})
export class ViewTruckComponent implements OnInit {

  idString = '';
  id: number|undefined;
  truck?: Offer | null;

  idCamion: number | undefined;
  status: string | undefined = '';
  locatie: string | undefined = '';
  volum: number | undefined;
  gabarit: number | undefined;
  greutate: number | undefined;
  detaliiCamion: string | undefined = '';

  constructor(private router: Router,
              private camionService: CamionService) { }

  ngOnInit(): void {
    this.getIdByUrl(this.router.url);
    this.id = +this.idString;
    this.camionService.getTrucksById(this.id).subscribe(res => {
      this.idCamion = res.body?.id;
      this.status = res.body?.status;
      this.locatie = res.body?.locatie;
      this.volum = res.body?.volum;
      this.gabarit = res.body?.gabarit;
      this.greutate = res.body?.greutate;
      this.detaliiCamion = res.body?.detalii;
    })
  }

  clickBack(): void {
    this.router.navigate(['/my-trucks']);
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
