import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { title } from 'process';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrl: './help.component.css',
})
export class HelpComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }

  helps = [
    {
      titleNumber: '01',
      title: 'Choose a category',
      description:
        'First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word.',
    },
    {
      titleNumber: '02',
      title: 'GUESS LETTERS',
      description:
        'Take turns guessing letters. The computer fills in the relevant blank spaces if your guess is correct. If it’s wrong, you lose some health, which empties after eight incorrect guesses.',
    },
    {
      titleNumber: '03',
      title: 'Win or lose',
      description:
        'You win by guessing all the letters in the word before your health runs out. If the health bar empties before you guess the word, you lose.',
    },
  ];
}
