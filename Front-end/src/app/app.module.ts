import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';

import { routing }        from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChoosenComponent } from './components/choosen/choosen.component';
import { GameComponent } from './components/game/game.component';
import { PartnerComponent } from './components/partner/partner.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ChoosenComponent,
    GameComponent,
    PartnerComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
