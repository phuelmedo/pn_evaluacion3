import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaRegistroComponent } from './busqueda-registro.component';

describe('BusquedaRegistroComponent', () => {
  let component: BusquedaRegistroComponent;
  let fixture: ComponentFixture<BusquedaRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaRegistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusquedaRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
