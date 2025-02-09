
import { HackerNewsDatService } from '../../shared/services/hacker-new-data.services';
import { PagedViewModel } from '../../shared/interfaces/pagedViewModel';
import { StoryDetails } from '../../shared/interfaces/storyDetails';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { HackernewsDetailsComponent } from '../hackernews-details/hackernews-details.component';
@Component({
  selector: 'app-hackernews-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatDialogModule],
  templateUrl: './hackernews-list.component.html',
  styleUrl: './hackernews-list.component.css',
})
export class HackernewsListComponent {
  displayedColumns: string[] = ['id', 'by', 'descendants', 'score', 'time', 'title', 'type', 'url'];
  dataSource = new MatTableDataSource<StoryDetails>();
  totalRecords = 0;
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pagedData: PagedViewModel<StoryDetails> | undefined;
  pageNumber = 1;

  constructor(private hackerNewsDataService: HackerNewsDatService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadStories(0, this.pageSize);
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.loadStories(this.paginator.pageIndex, this.paginator.pageSize))
    ).subscribe();
  }
  loadStories(page: number, size: number): void {
    this.hackerNewsDataService.getHackerNewsList(page + 1, size).subscribe((response: PagedViewModel<StoryDetails>) => {
      this.dataSource.data = response.results;
      this.totalRecords = response.total;
    });
  }
  /*
  Some links does not render in iframe, so we can not use this code.
  openDetails(url: string): void {
    this.dialog.open(HackernewsDetailsComponent, {
      width: '100%',
      height: '100%',
      data: { url }
    });
    
  }*/
}
