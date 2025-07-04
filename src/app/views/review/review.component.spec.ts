import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ExchangeService } from '@app/services/exchange/exchange.service';

import { ReviewComponent } from './review.component';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let exchangeService: ExchangeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();
    exchangeService = TestBed.inject(ExchangeService);

    exchangeService.setOrder({
      email: 'teste@exemple.com',
      governmentId: '00000000000',
      name: 'Exemple',
      phone: '(11) 11111-1111',
      exchangeItems: {
        USD: [
          {
            face: 1,
            quantity: 1,
            quotation: 5,
          },
        ],
      },
    });

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
