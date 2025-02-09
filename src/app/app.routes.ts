import { Routes } from '@angular/router';
import { HackernewsListComponent } from './hackernews-list/hackernews-list.component';
import { AppComponent } from './app.component';
import { HackernewsDetailsComponent } from './hackernews-details/hackernews-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HackernewsListComponent,
  },
  {
    path: 'news-list',
    component: HackernewsListComponent,
  },
  {
    path: 'news-details',
    component: HackernewsDetailsComponent,
  }
];
