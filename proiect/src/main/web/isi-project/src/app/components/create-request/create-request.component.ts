import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickMenu(): void {
    this.router.navigate(['/home']);
  }
}
