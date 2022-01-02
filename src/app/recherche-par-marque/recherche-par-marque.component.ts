import { Component, OnInit } from '@angular/core';
import { Marque } from '../model/marque';
import { Voiture } from '../model/voiture.model';
import { VoitureService } from '../services/voiture.service';

@Component({
  selector: 'app-recherche-par-marque',
  templateUrl: './recherche-par-marque.component.html',
  styles: [
  ]
})
export class RechercheParMarqueComponent implements OnInit {
   voitures : Voiture[];
   marques: Marque[];
   IdMarque:number;
  constructor(private voitureService: VoitureService) { }

  ngOnInit(): void {
    this.voitures=[];

    this.voitureService.listeMarques().subscribe( data => {
      this.marques = data;
      console.log(this.marques);
    });
    }
    onChange(){
      console.log(this.IdMarque);
      this.voitureService.rechercherParMarque(this.IdMarque).subscribe(
        data =>{
          this.voitures = data;
          console.log(this.voitures);
        }
      );
    }
}
