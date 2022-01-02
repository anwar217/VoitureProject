import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Marque } from '../model/marque';
import { Voiture } from '../model/voiture.model';
import { VoitureService } from '../services/voiture.service';

@Component({
  selector: 'app-add-voiture',
  templateUrl: './add-voiture.component.html' 
})
export class AddVoitureComponent implements OnInit {
    newVoiture =new Voiture();
    msg : string;
    marques: Marque[];
    newIdMarque:number;
    newMarque:Marque;

   constructor(private voitureService: VoitureService,
                private router : Router) { }
   ngOnInit(): void {
    this.voitureService.listeMarques().subscribe( data => {
      this.marques = data;
      console.log(this.marques);
    });
 }
  addVoiture(){
   /* this.voitureService.ajouterVoiture(this.newVoiture).subscribe(voit => {
      console.log(voit);
      });
      this.router.navigate(['voitures']).then(() => {
        window.location.reload();
        });*/
   this.newMarque=this.marques.find( marque => marque.idMarque == this.newIdMarque);
   this.newVoiture.marque=this.newMarque;
   this.voitureService.ajouterVoiture(this.newVoiture).subscribe(v => {
     console.log("ajouter voiture = "+v);
   });
   this.msg="Voiture"+this.newVoiture.categorieVoiture+"Ajout avec succès"  ;
   this.router.navigate(['/voitures']);
    }
   


}

