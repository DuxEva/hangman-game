import { GameService } from '@/app/services/game.service';
import { Category } from '@/model/types.model';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css'],
})
export class PlayGameComponent {
  life: number = 8;
  width: number = 100;
  isDone: boolean = false;
  isOpen: boolean = false;
  letters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  word: string[] = [];
  guessedWord: string[] = [];
  category: string = '';
  gameToPlay: Category = {
    name: '',
    items: [],
  };
  question: { name: string; selected: boolean } = { name: '', selected: false };
  clickedLetters: Set<string> = new Set();

  constructor(
    private router: ActivatedRoute,
    private gameService: GameService,
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

    this.getGameToPlay();

    this.playAgain();
  }

  getGameToPlay() {
    this.gameToPlay = this.gameService.getSelectedCategory(this.category);
  }

  getLetterValue(letter: string) {
    if (!this.clickedLetters.has(letter)) {
      if (this.word.includes(letter)) {
        for (let i = 0; i < this.word.length; i++) {
          if (this.word[i] === letter) {
            this.guessedWord[i] = letter;
          }
        }

        if (this.guessedWord.join('') === this.word.join('')) {
          this.isDone = true;
          this.isOpen = true;
        }
      } else {
        this.life--;
        this.width -= 12.5;
        if (this.life === 0) {
          this.isOpen = true;
        }
      }

      this.clickedLetters.add(letter);
    }
  }

  showOptions() {
    this.isOpen = true;
  }

  playAgain() {
    this.isDone = false;
    this.isOpen = false;
    this.width = 100;
    this.life = 8;
    this.clickedLetters.clear();
    const index = Math.floor(Math.random() * this.gameToPlay.items.length);
    this.question = this.gameToPlay.items[index];

    this.word = this.question.name
      .toLocaleUpperCase()
      .split('')
      .filter((letter) => letter !== ' ');
    this.guessedWord = new Array(this.word.length).fill('');

    for (let i = 0; i < this.word.length / 2; i++) {
      const index = Math.floor(Math.random() * this.word.length);
      this.guessedWord[index] = this.word[index];
    }
  }

  quitGame() {
    this.route.navigate(['/']);
  }

  goToCategories() {
    this.route.navigate(['/categories']);
  }

  continue() {
    this.isOpen = false;
  }
}
