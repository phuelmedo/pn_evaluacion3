import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarRegistroComponent } from './buscar-registro.component';

describe('BuscarRegistroComponent', () => {
  let component: BuscarRegistroComponent;
  let fixture: ComponentFixture<BuscarRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarRegistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
