import { Injectable } from '@angular/core';
import { Voiture } from '../model/voiture.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Marque } from '../model/marque';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };

@Injectable({
providedIn: 'root'
})
export class VoitureService {

  apiURL: string = 'http://localhost:8081/voitures/api';
    voitures: Voiture[];
    marques :Marque[];
    marque=new Marque();
    voiture=new Voiture();
    voituresRecherche:Voiture[];

constructor(private http : HttpClient,private authService : AuthService) {
  
}

listeVoiture(): Observable<Voiture[]>{
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt});
  return this.http.get<Voiture[]>(this.apiURL+"/all", {headers:httpHeaders});
  }
  ajouterVoiture( voit: Voiture):Observable<Voiture>{
    console.log("voiture service = "+JSON.stringify(voit));
    return this.http.post<Voiture>(this.apiURL, voit, httpOptions);
    }
    
supprimerVoiture(id : number) {
const url = `${this.apiURL}/${id}`;
return this.http.delete(url, httpOptions);
}


consulterVoiture(id: number): Observable<Voiture> {
  const url = `${this.apiURL}/${id}`;
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt});
  return this.http.get<Voiture>(url,{headers:httpHeaders});
  }

    trierVoitures(){
      this.voitures = this.voitures.sort((n1,n2) => {
      if (n1.idVoiture > n2.idVoiture) {
      return 1;
      }
      if (n1.idVoiture < n2.idVoiture) {
      return -1;
      }
      return 0;
      });
      }

      updateVoiture(voit :Voiture) : Observable<Voiture>
      {
        console.log("update request = "+JSON.stringify(voit));
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt});
        return this.http.put<Voiture>(this.apiURL, voit, {headers:httpHeaders});
      }
   listeMarques():Observable<Marque[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
     return this.http.get<Marque[]>(this.apiURL+"/marques/all", {headers:httpHeaders})
    }

   consulterMarque(id:number):Marque{
    this.marque= this.marques.find(marq =>marq.idMarque==id);
     return this.marque;
    }
    
    rechercherParMarque(idmarque: number): Observable<Voiture[]>{
      const url = `${this.apiURL}/voitsmarque/${idmarque}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt});
      return this.http.get<Voiture[]>(url, {headers:httpHeaders})
    }

      /*listeMarque(): Observable<Marque[]>{
        return this.http.get<Marque[]>(this.apiURL);
        }*/
    
}
