import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiComponent } from './ui/ui.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HandtrackerComponent } from './handtracker/handtracker.component';
import { RpsComponent } from './rps/rps.component';
import { QuickdrawComponent } from './quickdraw/quickdraw.component';
import { BlackjackComponent } from './blackjack/blackjack.component';

@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    HomePageComponent,
    HandtrackerComponent,
    RpsComponent,
    QuickdrawComponent,
    BlackjackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
