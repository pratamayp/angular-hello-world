import { TestBed } from '@angular/core/testing';

import { DateUtilService } from './date.service';

describe('DateUtilService', () => {
  let service: DateUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
