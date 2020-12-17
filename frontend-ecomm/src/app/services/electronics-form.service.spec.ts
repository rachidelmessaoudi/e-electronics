import { TestBed } from '@angular/core/testing';

import { ElectronicsFormService } from './electronics-form.service';

describe('ElectronicsFormService', () => {
  let service: ElectronicsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectronicsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
