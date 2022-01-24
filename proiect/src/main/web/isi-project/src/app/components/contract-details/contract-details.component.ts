import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ContractService} from "@app/services/contract.service";
import {Contract} from "@app/entities/contract";
import {Offer} from "@app/entities/offer";
import {Request} from "@app/entities/request";

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit {

  constructor(private router: Router, private contractService: ContractService) { }

  contract?: Contract

  ngOnInit(): void {
    this.contractService.getContractById(parseInt(this.router.url.split('/')[2])).subscribe((data:any) => {
      this.contract = data.body;
      console.log(this.contract)
    })
  }

  clickBack(): void {
    this.router.navigate(['/my-contracts']);
  }

  clickOffer(offer: Offer): void {
    this.router.navigate(['/view-offer', offer.id]);
  }
  clickRequest(request: Request): void {
    this.router.navigate(['/view-request', request.id]);
  }
  viewMap() : void {
    console.log( this.contract?.oferta?.camion?.id)
    this.router.navigate(['/camion', this.contract?.oferta?.camion?.id])
  }

}
