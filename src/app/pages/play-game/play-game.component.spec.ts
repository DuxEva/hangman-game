import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PlayGameComponent } from './play-game.component';
import { GameService } from '@/app/services/game.service';
import { Category } from '@/model/types.model';

describe('PlayGameComponent', () => {
  let component: PlayGameComponent;
  let fixture: ComponentFixture<PlayGameComponent>;
  let gameService: jest.Mocked<GameService>;
  let router: jest.Mocked<Router>;
  let activatedRoute: jest.Mocked<ActivatedRoute>;

  beforeEach(async () => {
    const gameServiceMock = {
      getSelectedCategory: jest.fn(),
    } as unknown as jest.Mocked<GameService>;

    const routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    const activatedRouteMock = {
      paramMap: of({
        get: jest.fn().mockReturnValue('Movies'),
      }),
    } as unknown as jest.Mocked<ActivatedRoute>;

    await TestBed.configureTestingModule({
      declarations: [PlayGameComponent],
      providers: [
        { provide: GameService, useValue: gameServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayGameComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService) as jest.Mocked<GameService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    activatedRoute = TestBed.inject(
      ActivatedRoute
    ) as jest.Mocked<ActivatedRoute>;

    gameService.getSelectedCategory.mockReturnValue({
      name: 'Movies',
      items: [{ name: 'Inception', selected: false }],
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct game category and word', () => {
    expect(gameService.getSelectedCategory).toHaveBeenCalledWith('Movies');
    expect(component.category).toBe('Movies');
    expect(component.gameToPlay).toEqual({
      name: 'Movies',
      items: [{ name: 'Inception', selected: false }],
    });
    expect(component.word).toEqual([
      'I',
      'N',
      'C',
      'E',
      'P',
      'T',
      'I',
      'O',
      'N',
    ]);
  });

  it('should navigate to categories on goToCategories', () => {
    component.goToCategories();
    expect(router.navigate).toHaveBeenCalledWith(['/categories']);
  });

  it('should show option to true ', () => {
    component.showOptions();
    expect(component.isOpen).toBe(true);
  });
  it('should continue when isOpen is false ', () => {
    component.continue();
    expect(component.isOpen).toBe(false);
  });

  it('should decrease life and width when incorrect letter is clicked', () => {
    component.word = ['I', 'N', 'C', 'E', 'P', 'T', 'I', 'O', 'N'];
    component.getLetterValue('Z');
    expect(component.life).toBe(7);
    expect(component.width).toBe(87.5);
  });

  it('should update guessedWord correctly when correct letter is clicked', () => {
    component.word = ['I', 'N', 'C', 'E', 'P', 'T', 'I', 'O', 'N'];
    component.guessedWord = ['', '', '', '', '', '', '', '', ''];
    component.getLetterValue('I');
    expect(component.guessedWord).toEqual(['I','','','','','','I','','']);
  });

  it('should set isDone to true when the word is completely guessed', () => {
    component.word = ['I', 'N', 'C', 'E', 'P', 'T', 'I', 'O', 'N'];
    component.guessedWord = ['I', 'N', 'C', 'E', 'P', 'T', 'I', 'O', ''];
    component.getLetterValue('N');
    expect(component.isDone).toBe(true);
    expect(component.isOpen).toBe(true);
  });

  it('should reset the game on playAgain', () => {
    component.playAgain();
    expect(component.isDone).toBe(false);
    expect(component.isOpen).toBe(false);
    expect(component.width).toBe(100);
    expect(component.life).toBe(8);
    expect(component.clickedLetters.size).toBe(0);
    expect(component.guessedWord.length).toBeGreaterThan(0);
  });

  it('should navigate to home on quitGame', () => {
    component.quitGame();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should handle incorrect letter guesses properly', () => {
    component.word = ['A', 'B', 'C'];
    component.guessedWord = ['', '', ''];
    component.getLetterValue('D');
    expect(component.life).toBe(7);
    expect(component.width).toBe(87.5);
  });

  it('should handle letter already guessed', () => {
    component.word = ['A', 'B', 'C'];
    component.guessedWord = ['', '', ''];
    component.clickedLetters.add('A');
    component.getLetterValue('A');
    // expect(component.guessedWord).toEqual(['A', '', '']);
    expect(component.clickedLetters.size).toBe(1);
  });

  it('should set isOpen to true when life reaches zero', () => {
    component.life = 1;
    component.width = 12.5;
    component.getLetterValue('Z');
    expect(component.life).toBe(0);
    expect(component.isOpen).toBe(true);
  });
});
