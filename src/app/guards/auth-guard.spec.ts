import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { authGuard } from './auth-guard';

describe('authGuard', () => {
  let guard: authGuard;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    // 🧪 Mock services used by the guard
    authServiceMock = {
      isLoggedIn: jasmine.createSpy('isLoggedIn')
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    // ✅ Configure testing module
    TestBed.configureTestingModule({
      providers: [
        authGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(authGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow route activation if logged in', () => {
    authServiceMock.isLoggedIn.and.returnValue(true);
    const result = guard.canActivate();
    expect(result).toBeTrue();
  });

  it('should block route activation if not logged in', () => {
    authServiceMock.isLoggedIn.and.returnValue(false);
    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
