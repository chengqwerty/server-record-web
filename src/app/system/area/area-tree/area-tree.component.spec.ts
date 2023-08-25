import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaTreeComponent } from './area-tree.component';

describe('AreaTreeComponent', () => {
  let component: AreaTreeComponent;
  let fixture: ComponentFixture<AreaTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
