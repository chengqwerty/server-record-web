import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtSidenavComponent } from './art-sidenav.component';

describe('ArtSidenavComponent', () => {
  let component: ArtSidenavComponent;
  let fixture: ComponentFixture<ArtSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtSidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
