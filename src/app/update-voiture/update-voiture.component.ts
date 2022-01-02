import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Marque } from '../model/marque';
import { Voiture } from '../model/voiture.model';
import { VoitureService } from '../services/voiture.service';

@Component({
  selector: 'app-update-voiture',
  templateUrl: './update-voiture.component.html',
  styles: [
  ]
})
export class UpdateVoitureComponent implements OnInit {
  currentVoiture = new Voiture();
  marques : Marque[];
  updateMarque = new Marque();
  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
    private voitureService: VoitureService ) { 

    }

  ngOnInit() {
    
    this.voitureService.listeMarques().subscribe( data => {
      this.marques = data;
      console.log(this.marques);
  
    });
  
      this.voitureService.consulterVoiture(this.activatedRoute.snapshot.params.id).
       subscribe( voit =>{ this.currentVoiture = voit; } ) ;
   }
  updateVoiture() {
    
    this.updateMarque = this.marques.find(marq =>marq.idMarque == this.currentVoiture.marque.idMarque);
    this.currentVoiture.marque = this.updateMarque;
    this.voitureService.updateVoiture(this.currentVoiture).subscribe(v =>{
      //console.log("updated voiture = "+JSON.stringify(v));
    });
    this.router.navigate(['/voitures']);
    }
}
