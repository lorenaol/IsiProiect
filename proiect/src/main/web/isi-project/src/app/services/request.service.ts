import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Offer} from "@app/entities/offer";
import {Observable} from "rxjs";
import {environment} from "@environments/environment";
import {map} from "rxjs/operators";
import {Request} from "@app/entities/request";

@Injectable({
  providedIn: 'root'
})

export class RequestService {

  constructor(private http: HttpClient) {
  }

  public addRequest(request: Request): Observable<HttpResponse<Request>>{
    console.log(request);
    return this.http.post<Request>( environment.apiUrl + 'cereri', request, {observe: 'response'})
      .pipe(map((res:HttpResponse<Request>) => res));
  }
}
