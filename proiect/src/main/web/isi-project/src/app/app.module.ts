import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import { RegisterComponent } from './components/register/register.component';
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { HomeComponent } from './components/home/home.component';
import {MatIconModule} from "@angular/material/icon";
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { ViewOffersComponent } from './components/view-offers/view-offers.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { ViewRequestsComponent } from './components/view-requests/view-requests.component';
import { MapComponent } from './components/map/map.component';
import { MyContractsComponent } from './components/my-contracts/my-contracts.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import {FirebaseService} from "./database/firebase";
import {FirebaseMockService} from "./database/firebase-mock";
import { ArcgisMapComponent } from './components/arcgis-map/arcgis-map.component';
import {NbCardModule, NbListModule} from "@nebular/theme";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ArcgisMapComponent,
    HomeComponent,
    CreateOfferComponent,
    ViewOffersComponent,
    CreateRequestComponent,
    ViewRequestsComponent,
    MapComponent,
    MyContractsComponent,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatIconModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'proiectISI'),
    AngularFireDatabaseModule,
    NbCardModule,
    NbListModule,
    HttpClientModule
  ],
  providers: [FirebaseService, FirebaseMockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
