import { TestBed } from '@angular/core/testing';

import { PublicationApiService } from './publication-api.service';

describe('PublicationApiService', () => {
  let service: PublicationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
