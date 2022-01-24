import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RequestService} from "@app/services/request.service";

@Component({
  selector: 'app-view-request-as-transportator',
  templateUrl: './view-request-as-transportator.component.html',
  styleUrls: ['./view-request-as-transportator.component.css']
})
export class ViewRequestAsTransportatorComponent implements OnInit {

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

  idUser: number | undefined;
  nameUser: string | undefined = '';
  emailUser: string | undefined = '';
  phoneUser: string | undefined = '';

  constructor(private router: Router,
              private requestService: RequestService) { }

  ngOnInit(): void {
    this.getIdByUrl(this.router.url);
    this.id = +this.idString;
    this.requestService.getRequestById(this.id).subscribe(res => {
      this.locPlecare = res.body?.locPlecare;
      this.locSosire = res.body?.locSosire;
      this.tipMarfa = res.body?.tipMarfa;
      this.dataPlecare = new Date(res.body!.dataPlecare!).getDate().toString() + '-' +
        new Date(res.body!.dataPlecare!).getMonth() + '-' +
        new Date(res.body!.dataPlecare!).getFullYear();
      this.dataMaximaPlecare = new Date(res.body!.dataMaximaPlecare!).getDate().toString() + '-' +
        new Date(res.body!.dataMaximaPlecare!).getMonth() + '-' +
        new Date(res.body!.dataMaximaPlecare!).getFullYear();
      this.dataSosire = new Date(res.body!.dataSosire!).getDate().toString() + '-' +
        new Date(res.body!.dataSosire!).getMonth() + '-' +
        new Date(res.body!.dataSosire!).getFullYear();
      this.dataMaximaSosire = new Date(res.body!.dataMaximaSosire!).getDate().toString() + '-' +
        new Date(res.body!.dataMaximaSosire!).getMonth() + '-' +
        new Date(res.body!.dataMaximaSosire!).getFullYear();
      this.masa = res.body?.masa;
      this.volum = res.body?.volum;
      this.detalii = res.body?.detalii;

      this.idUser = res.body?.user?.id;
      this.nameUser = res.body?.user?.name;
      this.emailUser = res.body?.user?.email;
      this.phoneUser = res.body?.user?.phone;
    })
  }

  clickBack(): void {
    this.router.navigate(['/view-requests']);
  }

  clickAccept(): void {

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
