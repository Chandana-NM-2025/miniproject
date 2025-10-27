import { TestBed } from '@angular/core/testing';

import { Wishlist } from '../pages/wishlist/wishlist';

describe('Wishlist', () => {
  let service: Wishlist;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Wishlist);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
