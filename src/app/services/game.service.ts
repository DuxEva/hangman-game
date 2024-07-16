import { Injectable } from '@angular/core';
import DATA from '@/data.json';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  data = DATA.categories;

  constructor() {}

  getGames() {
    return this.data;
  }

  getSelectedCategory(category: string) {
    return 
  }
}
