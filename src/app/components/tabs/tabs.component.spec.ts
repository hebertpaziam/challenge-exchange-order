import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should emit changeTab event on activateTab', () => {
    const tabs = [
      { label: 'Tab 1', value: 1 },
      { label: 'Tab 2', value: 2 },
    ];
    jest.spyOn(component.changeTab, 'emit');
    component.activateTab(tabs[1]);

    expect(component.changeTab.emit).toHaveBeenCalledWith(tabs[1]);
    expect(component.tabActivated()).toBe(tabs[1]);
  });
});
