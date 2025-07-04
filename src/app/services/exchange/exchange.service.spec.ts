import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ExchangeService } from './exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(ExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

