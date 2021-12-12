import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlackjackComponent } from './blackjack/blackjack.component';
import { HomePageComponent } from './home-page/home-page.component';
import { QuickdrawComponent } from './quickdraw/quickdraw.component';
import { RpsComponent } from './rps/rps.component';

const routes: Routes = [
    { path: '', component: HomePageComponent},
    { path: "rps", component: RpsComponent},
    { path: "quickdraw", component: QuickdrawComponent},
    { path: "blackjack", component: BlackjackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
