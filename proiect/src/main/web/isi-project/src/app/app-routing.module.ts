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
import {EditProfileComponent} from "@app/components/edit-profile/edit-profile.component";
import {SuggestionForOffersComponent} from "@app/components/suggestion-for-offers/suggestion-for-offers.component";
import {SuggestionForRequestsComponent} from "@app/components/suggestion-for-requests/suggestion-for-requests.component";
import {MyOffersComponent} from "@app/components/my-offers/my-offers.component";
import {MyRequestsComponent} from "@app/components/my-requests/my-requests.component";
import {ViewOfferComponent} from "@app/components/view-offer/view-offer.component";
import {RequestDetailsComponent} from "@app/components/request-details/request-details.component";
import {ViewRequestComponent} from "@app/components/view-request/view-request.component";
import {ViewRequestAsTransportatorComponent} from "@app/components/view-request-as-transportator/view-request-as-transportator.component";
import {ViewOffersAsExpeditorComponent} from "@app/components/view-offers-as-expeditor/view-offers-as-expeditor.component";
import {OfferDetailsComponent} from "@app/components/offer-details/offer-details.component";
import {ContractDetailsComponent} from "@app/components/contract-details/contract-details.component";
import {MyTrucksComponent} from "@app/components/my-trucks/my-trucks.component";
import {AddTruckComponent} from "@app/components/add-truck/add-truck.component";
import {ViewTruckComponent} from "@app/components/view-truck/view-truck.component";

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
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent
  },
  {path:'suggestionsOff/:id', component: SuggestionForOffersComponent},
  {path:'suggestionsReq/:id', component: SuggestionForRequestsComponent},
  {
    path: 'my-offers',
    component: MyOffersComponent
  },
  {
    path: 'my-requests',
    component: MyRequestsComponent
  },
  {
    path: 'view-offer/:id',
    component: ViewOfferComponent
  },
  {
    path: 'view-request/:id',
    component: ViewRequestComponent
  },
  {
    path:"requestDetails/:id",
    component: RequestDetailsComponent
  },
  {
    path:"offerDetails/:id",
    component: OfferDetailsComponent
  },
  {
    path: 'view-req/:id',
    component: ViewRequestAsTransportatorComponent
  },
  {
    path: 'view-of/:id',
    component: ViewOffersAsExpeditorComponent
  },
  {
    path: 'contract/:id',
    component: ContractDetailsComponent
  },
  {
    path: 'my-trucks',
    component: MyTrucksComponent
  },
  {
    path: 'add-truck',
    component: AddTruckComponent
  },
  {
    path: 'view-truck/:id',
    component: ViewTruckComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
