import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  createRequestDetailsForm = new FormGroup({
    locPlecare: new FormControl(''),
    dataPlecare: new FormControl(''),
    dataMaximaPlecare: new FormControl(''),
    locSosire: new FormControl(''),
    dataSosire: new FormControl(''),
    dataMaximaSosire: new FormControl(''),
    tipMarfa: new FormControl(''),
    masa: new FormControl(''),
    volum: new FormControl(''),
    buget: new FormControl(''),
    detalii: new FormControl('')
  });

  selected: 'Mobila' | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickMenu(): void {
    this.router.navigate(['/home']);
  }

  addRequestClick(): void {

  }
}
