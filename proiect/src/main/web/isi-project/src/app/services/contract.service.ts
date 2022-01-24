import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Offer} from "@app/entities/offer";
import {environment} from "@environments/environment";
import {map} from "rxjs/operators";
import {User} from "@app/entities/user";
import {Contract} from "@app/entities/contract";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) {}

  public getContractByUserId(userId: number): Observable<HttpResponse<Contract[]>> {
    const params = new HttpParams().set('userId', userId);
      return this.http.get<Contract[]>(environment.apiUrl + 'contracte' + "/findByUserId", {params, observe: 'response' })
        .pipe(map((res: HttpResponse<Contract[]>) => res));
    }

  public getContractById(id: number): Observable<HttpResponse<Contract[]>> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Contract[]>(environment.apiUrl + 'contracte' + "/findById", {params, observe: 'response' })
      .pipe(map((res: HttpResponse<Contract[]>) => res));
  }

  public addContract(contract: Contract): Observable<HttpResponse<Contract>>{
    return this.http.post<Contract>( environment.apiUrl + 'contracte', contract, {observe: 'response'})
      .pipe(map((res:HttpResponse<Contract>) => res));
  }
}
