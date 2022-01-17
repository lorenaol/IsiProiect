import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginDataModel} from "../models/login-data.model";
import {UserInfoModel} from "../models/user-info.model";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private baseUrl = 'http://localhost:8082/login';

  constructor(private http: HttpClient) {
  }

  verifyDataLogin(loginData: LoginDataModel): any {
    return this.http.post<UserInfoModel>(this.baseUrl, loginData);
  }
}
