import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpComponent } from './help.component';
import { Router } from '@angular/router';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back when back button is clicked', async () => {
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.goBack();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
