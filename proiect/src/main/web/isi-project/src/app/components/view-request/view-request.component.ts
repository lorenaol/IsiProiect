import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RequestService} from "@app/services/request.service";

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {

  idString = '';
  id: number|undefined;

  locPlecare: string | undefined = '';
  locSosire: string | undefined = '';
  tipMarfa: string | undefined = '';
  dataPlecare: string | undefined = '';
  dataMaximaPlecare: string | undefined = '';
  dataSosire: string | undefined = '';
  dataMaximaSosire: string | undefined = '';
  masa: number | undefined;
  buget: number | undefined;
  volum: number | undefined;
  detalii: string | undefined = '';

  constructor(private router: Router,
              private requestService: RequestService) { }

  ngOnInit(): void {
    this.getIdByUrl(this.router.url);
    this.id = +this.idString;
    this.requestService.getRequestById(this.id).subscribe(res => {
      this.locPlecare = res.body?.locPlecare;
      this.locSosire = res.body?.locSosire;
      this.tipMarfa = res.body?.tipMarfa;
      this.dataPlecare = res.body?.dataPlecare;
      this.dataMaximaPlecare = res.body?.dataMaximaPlecare;
      this.dataSosire = res.body?.dataSosire;
      this.dataMaximaSosire = res.body?.dataMaximaSosire;
      this.masa = res.body?.masa;
      this.volum = res.body?.volum;
      this.detalii = res.body?.detalii;
    })
  }

  clickBack(): void {
    this.router.navigate(['/my-requests']);
  }

  clickSimilar(): void {
    this.router.navigate(['/suggestionsReq', this.id])
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
