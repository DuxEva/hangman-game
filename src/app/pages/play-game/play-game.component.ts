import { GameService } from '@/app/services/game.service';
import { Category } from '@/model/types.model';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrl: './play-game.component.css',
})
export class PlayGameComponent {
  category: string = '';
  gameToPlay: Category = {
    name: '',
    items: [],
  };
  constructor(
    private router: ActivatedRoute,
    private gameServoce: GameService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.category = params.get('game') || '';
      if (this.category !== '') {
        this.category = this.category.split('_').join(' ');
        this.getGameToPlay();
      }
    });
  }

  getGameToPlay() {
    this.gameToPlay = this.gameServoce.getSelectedCategory(this.category);
    console.log('Game to Play:', this.gameToPlay);
  }

  goTocategories() {
    this.route.navigate(['/categories']);
  }
}
