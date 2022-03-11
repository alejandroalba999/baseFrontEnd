import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRutasComponent } from './gestion-rutas.component';

describe('GestionRutasComponent', () => {
  let component: GestionRutasComponent;
  let fixture: ComponentFixture<GestionRutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionRutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
