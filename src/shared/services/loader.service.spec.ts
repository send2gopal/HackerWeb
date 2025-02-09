import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';
import { take } from 'rxjs/operators';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show loading', (done) => {
    service.show();
    service.isLoading$.pipe(take(1)).subscribe((isLoading) => {
      expect(isLoading).toBeTrue();
      done();
    });
  });

  it('should hide loading', (done) => {
    service.show();
    service.hide();
    service.isLoading$.pipe(take(1)).subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
      done();
    });
  });

  it('should return loading status', (done) => {
    service.isLoading$.pipe(take(1)).subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
      service.show();
      service.isLoading$.pipe(take(1)).subscribe((isLoadingAfterShow) => {
        expect(isLoadingAfterShow).toBeTrue();
        done();
      });
    });
  });
});