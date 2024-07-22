import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jest.Mocked<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to help on goToHelp', () => {
    component.goToHelp();
    expect(router.navigate).toHaveBeenCalledWith(['/help']);
  });

  it('should navigate to categories on goToCategories', () => {
    component.goToCategories();
    expect(router.navigate).toHaveBeenCalledWith(['/categories']);
  });
});
