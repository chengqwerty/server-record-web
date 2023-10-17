import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartTreeComponent } from './depart-tree.component';

describe('DepartTreeComponent', () => {
  let component: DepartTreeComponent;
  let fixture: ComponentFixture<DepartTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartTreeComponent]
    });
    fixture = TestBed.createComponent(DepartTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
