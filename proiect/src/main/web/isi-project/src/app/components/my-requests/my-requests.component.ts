import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickBack(): void {
    this.router.navigate(['/create-request']);
  }

}
