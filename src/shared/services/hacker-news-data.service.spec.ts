import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { HackerNewsDataService } from './hacker-news-data.service';
import { environment } from '../../environments/environment';
import { PagedViewModel } from '../interfaces/paged-view-model';
import { StoryDetails } from '../interfaces/story-details';
import { provideHttpClient } from '@angular/common/http';

describe('HackerNewsDataService', () => {
  let service: HackerNewsDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HackerNewsDataService,provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(HackerNewsDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch hacker news list with correct URL and headers', () => {
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
    
    const pageNumber = 1;
    const pageSize = 10;
    const expectedUrl = `${environment.BASE_API_URL}/hackernews/new-stories?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    service.getHackerNewsList(pageNumber, pageSize).subscribe(response => {
      expect(response.page).toBe(mockResponse.page);
      expect(response.size).toBe(mockResponse.size);
      expect(response.total).toBe(mockResponse.total);
      expect(response.count).toBe(mockResponse.count);
      expect(response.metadata).toEqual(mockResponse.metadata);
      expect(response.errors).toEqual(mockResponse.errors);
      expect(response.isPartialSuccess).toBe(mockResponse.isPartialSuccess);
      expect(response.results.length).toBe(mockResponse.results.length);
      
      response.results.forEach((story, index) => {
        expect(story.id).toBe(mockResponse.results[index].id);
        expect(story.title).toBe(mockResponse.results[index].title);
        expect(story.url).toBe(mockResponse.results[index].url);
        expect(story.by).toBe(mockResponse.results[index].by);
        expect(story.time).toBe(mockResponse.results[index].time);
        expect(story.descendants).toBe(mockResponse.results[index].descendants);
        expect(story.score).toBe(mockResponse.results[index].score);
        expect(story.type).toBe(mockResponse.results[index].type);
      });
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockResponse);
  });
});
