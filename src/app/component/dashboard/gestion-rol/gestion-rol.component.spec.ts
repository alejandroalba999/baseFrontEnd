import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRolComponent } from './gestion-rol.component';

describe('GestionRolComponent', () => {
  let component: GestionRolComponent;
  let fixture: ComponentFixture<GestionRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
