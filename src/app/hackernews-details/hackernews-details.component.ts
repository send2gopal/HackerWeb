import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-hackernews-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './hackernews-details.component.html',
  styleUrl: './hackernews-details.component.css'
})
export class HackernewsDetailsComponent {
  safeUrl: SafeResourceUrl;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { url: string }, private sanitizer: DomSanitizer) 
  {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
  }
}
