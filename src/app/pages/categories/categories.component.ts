import { GameService } from '@/app/services/game.service';
import { Category, Item } from '@/model/types.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories:
    | {
        Movies: Item[];
        'TV Shows': Item[];
        Countries: Item[];
        'Capital Cities': Item[];
        Animals: Item[];
        Sports: Item[];
      }
    | undefined;

  keys: string[] = [];
  paramKeys: string[] = [];
  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.categories = this.gameService.getGames();

    this.keys = Object.keys(this.categories);
    this.paramKeys = this.keys.map((key) => key.split(' ').join('_'));
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
