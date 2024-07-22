import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import DATA from '@/data.json';
import { Category } from '@/model/types.model';

// Mocking the data imported from '@/data.json'
jest.mock('@/data.json', () => ({
  categories: {
    Movies: [{ name: 'Inception', selected: false }],
    'TV Shows': [{ name: 'Breaking Bad', selected: false }],
  },
}));

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all games', () => {
    const expectedData = {
      Movies: [{ name: 'Inception', selected: false }],
      'TV Shows': [{ name: 'Breaking Bad', selected: false }],
    };
    expect(service.getGames()).toEqual(expectedData);
  });

  it('should return the selected category', () => {
    const category = 'Movies';
    const expectedCategory: Category = {
      name: 'Movies',
      items: [{ name: 'Inception', selected: false }],
    };
    expect(service.getSelectedCategory(category)).toEqual(expectedCategory);
  });

  it('should return an empty category if not found', () => {
    const category = 'NonExistentCategory';
    const expectedCategory: Category = {
      name: '',
      items: [],
    };
    expect(service.getSelectedCategory(category)).toEqual(expectedCategory);
  });
});
