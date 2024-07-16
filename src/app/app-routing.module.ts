import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './pages/help/help.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { PlayGameComponent } from './pages/play-game/play-game.component';

const routes: Routes = [
  { path: 'help', component: HelpComponent },
  { path: 'categories', component: CategoriesComponent },
  {path: 'categories/:game', component: PlayGameComponent},
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
