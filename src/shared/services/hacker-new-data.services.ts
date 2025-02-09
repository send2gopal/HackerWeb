import { StoryDetails } from '../interfaces/storyDetails';
import { PagedViewModel } from '../interfaces/pagedViewModel';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HackerNewsDataService {

    constructor(private http: HttpClient) {}

    getHackerNewsList(pageNumber: number, pageSize:number ): Observable<PagedViewModel<StoryDetails>> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
        var url = `${environment.BASE_API_URL}/hackernews/new-stories?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        return this.http.get<PagedViewModel<StoryDetails>>(url, { headers: headers });
      }
}
