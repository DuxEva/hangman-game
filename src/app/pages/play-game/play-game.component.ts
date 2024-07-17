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
  isDone: boolean = false;
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

    const index = Math.floor(Math.random() * this.gameToPlay.items.length);
    this.question = this.gameToPlay.items[index];

    this.word = this.question.name
      .toLocaleUpperCase()
      .split('')
      .filter((letter) => letter !== ' ');
    console.log('Word:', this.word);
    this.guessedWord = new Array(this.word.length).fill('');

    for (let i = 0; i < this.word.length / 2; i++) {
      const index = Math.floor(Math.random() * this.word.length);
      this.guessedWord[index] = this.word[index];
    }
  }

  getGameToPlay() {
    this.gameToPlay = this.gameService.getSelectedCategory(this.category);
  }

  goTocategories() {
    this.route.navigate(['/categories']);
  }

  getLetterValue(letter: string) {
    if (this.word.includes(letter)) {
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter) {
          this.guessedWord[i] = letter;
        }
      }

      if (this.guessedWord.join('') === this.word.join('')) {
        console.log('Congratulations! You got it right');
        this.isDone = true;
      }
    }

    this.clickedLetters.add(letter);
  }

  showOptions() {
    this.isDone = true;
  }
}
