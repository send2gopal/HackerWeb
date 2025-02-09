import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { HackernewsDetailsComponent } from './hackernews-details.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

describe('HackernewsDetailsComponent', () => {
  let component: HackernewsDetailsComponent;
  let fixture: ComponentFixture<HackernewsDetailsComponent>;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, NoopAnimationsModule, BrowserModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { url: 'http://mockurlforstory.com' } }
        
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HackernewsDetailsComponent);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sanitize the input URL', () => {
    const testUrl = 'http://mockurlforstory.com';
    const sanitizedUrl = sanitizer.bypassSecurityTrustResourceUrl(testUrl);
    expect(component.safeUrl).toEqual(sanitizedUrl);
  });

  it('should receive dialog data correctly', () => {
    expect(component.data.url).toBe('http://mockurlforstory.com');
  });
});
