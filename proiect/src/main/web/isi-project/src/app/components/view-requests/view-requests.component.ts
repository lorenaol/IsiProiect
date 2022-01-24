import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Request} from "@app/entities/request";
import {RequestService} from "@app/services/request.service";

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {

  requests: Request[] | null | undefined;
  id: number | undefined;

  constructor(private router: Router,
              private requestService: RequestService) { }

  ngOnInit(): void {
    this.requestService.getRequestsByStatus().subscribe(res => {
      this.requests = res.body;
      console.log(this.requests);
    })
  }

  clickBack(): void {
    this.router.navigate(['/home']);
  }
  empty(): boolean {
    return true
  }

  clickRequest(request: Request): void {
    this.id = request.id;
    this.router.navigate(['/view-req', request.id]);
  }
}
