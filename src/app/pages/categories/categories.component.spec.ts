import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { GameService } from '@/app/services/game.service';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let gameService: jest.Mocked<GameService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const gameServiceMock = {
      getGames: jest.fn(),
    } as unknown as jest.Mocked<GameService>;

    const routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      providers: [
        { provide: GameService, useValue: gameServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService) as jest.Mocked<GameService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    gameService.getGames.mockReturnValue({
      Movies: [],
      'TV Shows': [],
      Countries: [],
      'Capital Cities': [],
      Animals: [],
      Sports: [],
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct categories and keys', () => {
    expect(gameService.getGames).toHaveBeenCalled();
    expect(component.categories).toEqual({
      Movies: [],
      'TV Shows': [],
      Countries: [],
      'Capital Cities': [],
      Animals: [],
      Sports: [],
    });
    expect(component.keys).toEqual([
      'Movies',
      'TV Shows',
      'Countries',
      'Capital Cities',
      'Animals',
      'Sports',
    ]);
    expect(component.paramKeys).toEqual([
      'Movies',
      'TV_Shows',
      'Countries',
      'Capital_Cities',
      'Animals',
      'Sports',
    ]);
  });

  it('should navigate to home on goHome', () => {
    component.goHome();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
