import { CommonModule } from '@angular/common';
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { Api } from '../../service/api';

@Component({
  selector: 'app-demo-api',
  imports: [CommonModule],
  templateUrl: './demo-api.html',
  styleUrl: './demo-api.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoApi {
  response = signal<any>(null);
  loading = signal(false);

  constructor(private apiService: Api) {}

  callValidApi() {
    this.loading.set(true);
    this.response.set(null);
    this.apiService.getPosts().subscribe({
      next: (data) => {
        this.response.set(data.slice(0, 3)); // First 3 posts
        this.loading.set(false);
      },
      error: (err) => this.loading.set(false)
    });
  }

  callInvalidApi() {
    this.loading.set(true);
    this.response.set(null);
    this.apiService.getInvalid().subscribe({
      next: (data) => {
        this.response.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        // Error handled by interceptor - won't reach here
      }
    });
  }
}