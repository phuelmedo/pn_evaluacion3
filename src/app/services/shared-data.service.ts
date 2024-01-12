import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private filtroSubject = new BehaviorSubject<{ sexo: string; fechaIngreso: string; enfermedad: string }>({
    sexo: '',
    fechaIngreso: '',
    enfermedad: '',
  });

  filtro$ = this.filtroSubject.asObservable();

  actualizarFiltro(filtro: { sexo: string; fechaIngreso: string; enfermedad: string }): void {
    this.filtroSubject.next(filtro);
  }
}