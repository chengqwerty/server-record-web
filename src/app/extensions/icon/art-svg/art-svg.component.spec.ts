import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtSvgComponent } from './art-svg.component';

describe('ArtSvgComponent', () => {
  let component: ArtSvgComponent;
  let fixture: ComponentFixture<ArtSvgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtSvgComponent]
    });
    fixture = TestBed.createComponent(ArtSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
