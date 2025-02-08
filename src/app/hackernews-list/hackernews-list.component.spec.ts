import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackernewsListComponent } from './hackernews-list.component';

describe('HackernewsListComponent', () => {
  let component: HackernewsListComponent;
  let fixture: ComponentFixture<HackernewsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HackernewsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HackernewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
