import {Injectable} from "@angular/core";
import {User} from "../entities/user";
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})



export class UserService {

  constructor(private http: HttpClient) { }

  public addUser(user: User): Observable<HttpResponse<User>>{
    return this.http.post<User>( environment.apiUrl + 'users', user, {observe: 'response'})
      .pipe(map((res:HttpResponse<User>) => res));
  }

}
