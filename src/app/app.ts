import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly loadingService = inject(LoadingService);
  isLoading = computed(() => this.loadingService.isLoading());
}
