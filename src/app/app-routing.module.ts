import { NgModule } from '@angular/core';
import { VoituresComponent } from './voitures/voitures.component';
import { AddVoitureComponent } from './add-voiture/add-voiture.component';
import { RouterModule, Routes } from '@angular/router';
import { UpdateVoitureComponent } from './update-voiture/update-voiture.component';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { VoitureGuard } from './voiture.guard';

const routes: Routes = [
  {path :  "voitures", component : VoituresComponent},
  {path :  "add-voiture", component : AddVoitureComponent,canActivate:[VoitureGuard]},
  {path : "updateVoiture/:id", component: UpdateVoitureComponent},
  {path : "rechercheParMarque", component : RechercheParMarqueComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  { path: "", redirectTo: "voitures", pathMatch: "full" }
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
