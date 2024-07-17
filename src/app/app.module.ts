import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelpComponent } from './pages/help/help.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { PlayGameComponent } from './pages/play-game/play-game.component';
import { LetterComponent } from './components/letter/letter.component';

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
    HomeComponent,
    CategoriesComponent,
    PlayGameComponent,
    LetterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
