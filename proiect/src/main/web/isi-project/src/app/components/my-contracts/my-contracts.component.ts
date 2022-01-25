import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Offer} from "@app/entities/offer";
import {Contract} from "@app/entities/contract";
import {ContractService} from "@app/services/contract.service";
import {User} from "@app/entities/user";

@Component({
  selector: 'app-my-contracts',
  templateUrl: './my-contracts.component.html',
  styleUrls: ['./my-contracts.component.css']
})
export class MyContractsComponent implements OnInit {

  constructor(private router: Router, private contractService: ContractService) { }


  user: User | undefined;
  contracts: Contract[] | null | undefined;
  id: string|undefined;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.contractService.getContractByUserId(this.user?.id!).subscribe(res => {
      this.contracts = res.body;
    })
  }

  clickBack(): void {
    this.router.navigate(['/home']);
  }

  clickContract(contract: Contract): void {
    localStorage.setItem("contract", JSON.stringify( contract))
    this.router.navigate(['/contract', contract.id]);
  }
}
