import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickMenu(): void {
    this.router.navigate(['/home']);
  }
}
