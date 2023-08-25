import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerNamespaceComponent } from './server-namespace.component';

describe('ServerNamespaceComponent', () => {
  let component: ServerNamespaceComponent;
  let fixture: ComponentFixture<ServerNamespaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerNamespaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerNamespaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
