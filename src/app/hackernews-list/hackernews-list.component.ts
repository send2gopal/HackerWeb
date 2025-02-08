import { Component } from '@angular/core';
import { HackerNewsDatService } from '../../shared/services/hacker-new-data.services';
import { share } from 'rxjs';
import { PagedViewModel } from '../../shared/interfaces/pagedViewModel';
import { StoryDetails } from '../../shared/interfaces/storyDetails';
@Component({
  selector: 'app-hackernews-list',
  standalone: true,
  imports: [],
  templateUrl: './hackernews-list.component.html',
  styleUrl: './hackernews-list.component.css',
})
export class HackernewsListComponent {
  pagedData: PagedViewModel<StoryDetails> | undefined;
  pageNumber = 1;
  pageSize = 10;
  constructor(private hackerNewsDataService: HackerNewsDatService) {}

  ngOnInit(): void {
    this.loadHackerNews();
  }

  loadHackerNews(): void {
    this.hackerNewsDataService
      .getHackerNewsList(this.pageNumber, this.pageSize)
      .subscribe({
        next: (data) => {
          this.pagedData = data;
          console.log(this.pagedData);
        },
        error: (error) => {
          // Handle errors if needed
          console.error('Error fetching users:', error);
        },
      });
  }
}
