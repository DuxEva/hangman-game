import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.css',
})
export class LetterComponent {
  @Input() letter: string = '';
}
