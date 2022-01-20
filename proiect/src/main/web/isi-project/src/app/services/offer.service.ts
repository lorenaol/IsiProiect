import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "@environments/environment";
import {map} from "rxjs/operators";
import {Offer} from "@app/entities/offer";

@Injectable({
  providedIn: 'root'
})

export class OfferService {

  constructor(private http: HttpClient) {
  }

  public addOffer(offer: Offer): Observable<HttpResponse<Offer>>{
    console.log(offer);
    return this.http.post<Offer>( environment.apiUrl + 'oferte', offer, {observe: 'response'})
      .pipe(map((res:HttpResponse<Offer>) => res));
  }

  public getOffer(): Observable<HttpResponse<Offer[]>> {
    return this.http.get<Offer[]>(environment.apiUrl + 'oferte', { observe: 'response' })
      .pipe(map((res: HttpResponse<Offer[]>) => res));
  }
}
