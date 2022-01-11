import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-contracts',
  templateUrl: './my-contracts.component.html',
  styleUrls: ['./my-contracts.component.css']
})
export class MyContractsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickMenu(): void {
    this.router.navigate(['/home']);
  }
}
