import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@environment';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  X_API_KEY = environment.X_API_KEY;
}
