import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtLayoutComponent } from './art-layout.component';

describe('ArtLayoutComponent', () => {
  let component: ArtLayoutComponent;
  let fixture: ComponentFixture<ArtLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
