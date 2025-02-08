import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackernewsDetailsComponent } from './hackernews-details.component';

describe('HackernewsDetailsComponent', () => {
  let component: HackernewsDetailsComponent;
  let fixture: ComponentFixture<HackernewsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HackernewsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HackernewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
