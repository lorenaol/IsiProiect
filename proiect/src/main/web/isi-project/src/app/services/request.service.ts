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

  public getRequestsByUserId(id: number | undefined): Observable<HttpResponse<Request[]>> {
    return this.http.get<Request[]>(`${environment.apiUrl}cereri/by-user-id?id=${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<Request[]>) => res));
  }

  public getRequests() : Observable<HttpResponse<Request[]>> {
    return  this.http.get<Request[]>(environment.apiUrl + 'cereri', {observe:'response'})
      .pipe(map((res:HttpResponse<Request[]>) => res));
  }

  public getRequestsByStatus() : Observable<HttpResponse<Request[]>> {
    return  this.http.get<Request[]>(environment.apiUrl + 'cereri/status', {observe:'response'})
      .pipe(map((res:HttpResponse<Request[]>) => res));
  }

  public getRequestById(id? : number): Observable<HttpResponse<Request>> {
    return this.http.get<Request>(`${environment.apiUrl}cereri/by-id?id=${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<Request>) => res));
  }

  public getAllRequests(): Observable<HttpResponse<Request[]>> {
    return this.http.get<Request[]>(`${environment.apiUrl}cereri`, { observe: 'response' })
      .pipe(map((res: HttpResponse<Request[]>) => res));
  }
}
