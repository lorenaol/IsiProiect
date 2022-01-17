import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "@app/entities/user";
import {Observable} from "rxjs";
import {environment} from "@environments/environment";
import {map} from "rxjs/operators";
import {Camion} from "@app/entities/camion";

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
}
