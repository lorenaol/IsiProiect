import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "@app/entities/user";
import {Request} from "@app/entities/request";
import {RequestService} from "@app/services/request.service";
import {Offer} from "@app/entities/offer";

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  user: User | undefined;
  myRequests: Request[] | null | undefined;
  id: number | undefined;

  constructor(private router: Router,
              private requestService: RequestService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.requestService.getRequestsByUserId(this.user?.id).subscribe(res => {
      this.myRequests = res.body;
      console.log(this.myRequests);
    })
  }

  clickBack(): void {
    this.router.navigate(['/create-request']);
  }

  clickRequest(request: Request): void {
    this.id = request.id;
    this.router.navigate(['/view-request', request.id]);
  }
}
