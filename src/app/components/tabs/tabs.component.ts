import { AfterViewInit, ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tabs',
  imports: [MatButtonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements AfterViewInit {
  readonly tabs = input<{ label: string; value: any }[]>([]);
  readonly tabActivated = signal<any | undefined>(this.tabs()?.[0]);

  readonly changeTab = output();

  activateTab(tab: any): void {
    this.changeTab.emit(tab);
    this.tabActivated.set(tab);
  }

  ngAfterViewInit(): void {
    this.tabActivated.set(this.tabs()?.[0]);
  }
}
