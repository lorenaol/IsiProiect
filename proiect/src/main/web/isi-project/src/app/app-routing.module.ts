import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {CreateOfferComponent} from "./components/create-offer/create-offer.component";
import {ViewOffersComponent} from "./components/view-offers/view-offers.component";
import {CreateRequestComponent} from "./components/create-request/create-request.component";
import {ViewRequestsComponent} from "./components/view-requests/view-requests.component";
import {MapComponent} from "./components/map/map.component";
import {MyContractsComponent} from "./components/my-contracts/my-contracts.component";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";
import {ArcgisMapComponent} from "./components/arcgis-map/arcgis-map.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'create-offer',
    component: CreateOfferComponent
  },
  {
    path: 'view-offers',
    component: ViewOffersComponent
  },
  {
    path: 'create-request',
    component: CreateRequestComponent
  },
  {
    path: 'view-requests',
    component: ViewRequestsComponent
  },
  {
    path: 'map',
    component: ArcgisMapComponent
  },
  {
    path: 'my-contracts',
    component: MyContractsComponent
  },
  {
    path: 'my-profile',
    component: MyProfileComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
