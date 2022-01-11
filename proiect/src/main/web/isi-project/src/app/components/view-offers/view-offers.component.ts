import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-offers',
  templateUrl: './view-offers.component.html',
  styleUrls: ['./view-offers.component.css']
})
export class ViewOffersComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickMenu(): void {
    this.router.navigate(['/home']);
  }
}
