import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuseTabsComponent } from './reuse-tabs.component';

describe('ReuseTabComponent', () => {
  let component: ReuseTabsComponent;
  let fixture: ComponentFixture<ReuseTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReuseTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReuseTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
