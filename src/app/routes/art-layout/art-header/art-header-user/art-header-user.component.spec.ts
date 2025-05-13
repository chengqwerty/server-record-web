import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtHeaderUserComponent } from './art-header-user.component';

describe('ArtHeaderUserComponent', () => {
  let component: ArtHeaderUserComponent;
  let fixture: ComponentFixture<ArtHeaderUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtHeaderUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtHeaderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
