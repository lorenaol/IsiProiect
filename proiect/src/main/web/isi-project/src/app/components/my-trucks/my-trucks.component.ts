import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Offer} from "@app/entities/offer";
import {Camion} from "@app/entities/camion";
import {CamionService} from "@app/services/camion.service";
import {User} from "@app/entities/user";

@Component({
  selector: 'app-my-trucks',
  templateUrl: './my-trucks.component.html',
  styleUrls: ['./my-trucks.component.css']
})
export class MyTrucksComponent implements OnInit {

  user: User | undefined;
  myTrucks: Camion[] | null | undefined;
  id: number|undefined;

  constructor(private router: Router,
              private camionService: CamionService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.camionService.getTrucksByUserId(this.user?.id).subscribe(res => {
      this.myTrucks = res.body;
      console.log(this.myTrucks);
    })
  }

  clickBack(): void {
    this.router.navigate(['/home']);
  }

  clickAddTruck(): void {
    this.router.navigate(['/add-truck']);
  }

  clickTruck(truck: Camion): void {
    this.id = truck.id;
    this.router.navigate(['/view-truck', truck.id]);
  }

}
