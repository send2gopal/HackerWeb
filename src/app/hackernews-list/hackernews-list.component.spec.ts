import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HackernewsListComponent } from './hackernews-list.component';
import { HackerNewsDataService } from '../../shared/services/hacker-news-data.service';
import { PagedViewModel } from '../../shared/interfaces/paged-view-model';
import { StoryDetails } from '../../shared/interfaces/story-details';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HackernewsListComponent', () => {
  let component: HackernewsListComponent;
  let fixture: ComponentFixture<HackernewsListComponent>;
  let hackerNewsDataService: jasmine.SpyObj<HackerNewsDataService>;

  beforeEach(async () => {
    const hackerNewsDataServiceSpy = jasmine.createSpyObj('HackerNewsDataService', ['getHackerNewsList']);
    
    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatPaginatorModule, MatDialogModule, HackernewsListComponent, NoopAnimationsModule],
      providers: [
        { provide: HackerNewsDataService, useValue: hackerNewsDataServiceSpy },
        { provide: MatDialog, useValue: {} },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HackernewsListComponent);
    component = fixture.componentInstance;
    hackerNewsDataService = TestBed.inject(HackerNewsDataService) as jasmine.SpyObj<HackerNewsDataService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and load stories on ngOnInit', () => {
    const mockResponse: PagedViewModel<StoryDetails> = {
      page: 1,
      size: 10,
      total: 1,
      count: 1,
      results: [
        { id: 1, title: 'Test Story', url: 'http://mockurlforstory.com', by: 'user1', time: '1234567890', descendants: 10, score: 100, type: 'story' },
      ],
      metadata: {},
      errors: [],
      isPartialSuccess: false
    };
    hackerNewsDataService.getHackerNewsList.and.returnValue(of(mockResponse));
    
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.dataSource.data.length).toBe(1);
    expect(component.totalRecords).toBe(1);
  });

  it('should load stories and update data source', () => {
    const mockResponse: PagedViewModel<StoryDetails> = {
      page: 1,
      size: 10,
      total: 2,
      count: 2,
      results: [
        { id: 1, title: 'Test Story 1', url: 'http://mockurlforstory.com/1', by: 'user1', time: '1234567890', descendants: 10, score: 100, type: 'story' },
        { id: 2, title: 'Test Story 2', url: 'http://mockurlforstory.com/2', by: 'user2', time: '1234567891', descendants: 20, score: 200, type: 'story' }
      ],
      metadata: {},
      errors: [],
      isPartialSuccess: false
    };
    hackerNewsDataService.getHackerNewsList.and.returnValue(of(mockResponse));
    
    component.loadStories(0, 10);
    fixture.detectChanges();

    expect(component.dataSource.data.length).toBe(2);
    expect(component.totalRecords).toBe(2);
  });
});
