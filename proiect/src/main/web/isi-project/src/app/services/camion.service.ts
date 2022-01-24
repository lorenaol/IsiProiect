import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "@app/entities/user";
import {Observable} from "rxjs";
import {environment} from "@environments/environment";
import {map} from "rxjs/operators";
import {Camion} from "@app/entities/camion";
import {Offer} from "@app/entities/offer";

@Injectable({
  providedIn: 'root'
})

export class CamionService {

  constructor(private http: HttpClient) {
  }

  public addCamion(camion: Camion): Observable<HttpResponse<Camion>>{
    return this.http.post<Camion>( environment.apiUrl + 'camioane', camion, {observe: 'response'})
      .pipe(map((res:HttpResponse<Camion>) => res));
  }

  public getTrucksByUserId(id: number | undefined): Observable<HttpResponse<Camion[]>> {
    return this.http.get<Camion[]>(`${environment.apiUrl}camioane/by-user-id?id=${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<Camion[]>) => res));
  }

  public getTrucksById(id: number | undefined): Observable<HttpResponse<Camion>> {
    return this.http.get<Camion>(`${environment.apiUrl}camioane/by-id?id=${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<Camion>) => res));
  }

  public setStatus(status: string, id: number | undefined): any{
    return this.http.put<Camion>( `${environment.apiUrl}camioane/status?status=${status}&id=${id}`, {observe: 'response'})
  }
}
