import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = 'http://localhost:8080/users';
  token:string;

  public loggedUser: string;
  public isloggedIn: Boolean = false;
  public roles: string[];
  private helper = new JwtHelperService();

  constructor(private router: Router,private http:HttpClient) { }

  login(user: User) {
    return this.http.post<User>(this.apiURL + '/login', user, { observe: 'response' });
  }
  saveToken(jwt : string){
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJwt();
  }

  decodeJwt(){
    if(this.token == undefined)
      return ;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
    this.isloggedIn = true;
  }

  loadToken(){
    this.token = localStorage.getItem('jwt');
    this.decodeJwt();
  }

  getToken():string{
    return this.token;
  }

  isTokenExpired(): Boolean{
    return this.helper.isTokenExpired(this.token);
  }

  logout(){
    this.isloggedIn = false;
    this.loggedUser = undefined;
    this.roles = undefined;
    this.token = undefined;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  SignIn(user : User){
    
    this.loggedUser = user.username;
    this.isloggedIn = true;
    this.roles = user.roles;
    localStorage.setItem('loggedUser', this.loggedUser);
    localStorage.setItem('isLoggedIn', String(this.isloggedIn));
  }

  isAdmin():Boolean{
    if(!this.roles)
      return false;
  
    return this.roles.indexOf("ADMIN") >= 0;
  }

  setLoggedUserFromLocalStorage(login : string){
    this.loggedUser = login;
    this.isloggedIn = true;
    this.getUserRoles(login);
  }

  getUserRoles(username : string){
    this.getUserFromDB(username).subscribe((user:User) => {
      console.log(user);
      this.roles = user.roles;
    });
  }


  getUserFromDB(username : string): Observable<User>{
    const url = `${this.apiURL}/login/${username}`;
    return this.http.get<User>(url);
  }
 

}
