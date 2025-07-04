import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tabs',
  imports: [MatButtonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  readonly tabs = input<{ label: string; value: any }[]>([]);
  readonly tabActivated = signal(this.tabs()?.[0]);

  readonly changeTab = output();

  activateTab(tab: any): void {
    this.changeTab.emit(tab);
    this.tabActivated.set(tab);
  }
}
