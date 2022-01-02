import { Component, OnInit } from '@angular/core';
import { Marque } from '../model/marque';

import { Voiture } from '../model/voiture.model';
import { AuthService } from '../services/auth.service';
import { VoitureService } from '../services/voiture.service';


@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  
 
})
export class VoituresComponent implements OnInit {
  voitures : Voiture[];
  marques : Marque[];
  constructor(private voitureService: VoitureService ,public authService: AuthService) { 
    //this.voitures = voitureService.listeVoiture();
  
  }

  ngOnInit(): void {
    this.voitureService.listeVoiture().subscribe(voit => {
      console.log(voit);
      this.voitures = voit;
      });
      this.voitureService.listeMarques().subscribe( data => {
        this.marques = data;
        console.log(this.marques);
      });
  }
  supprimerVoiture(v: Voiture)
  {
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
  this.voitureService.supprimerVoiture(v.idVoiture).subscribe(() => {
  console.log("voiture supprimée");
  this.SuprimerVoitureDuTableau(v);
  });
  
  }

  SuprimerVoitureDuTableau(voit : Voiture) {
    this.voitures.forEach((cur, index) => {
    if(voit.idVoiture=== cur.idVoiture) {
    this.voitures.splice(index, 1);
    }
    });
    }
}
