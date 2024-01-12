import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private api: string = "http://localhost:3001/api/pacientes"

  constructor(private httpClient: HttpClient) {}

  obtenerUltimos5Pacientes(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.api);
  }

  agregarPaciente(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.api}/create`, formData);
  }

  listarPacientesPersonalizada(sexo: string, fechaIngreso: string, enfermedad: string): Observable<any[]> {
    const queryParams = new URLSearchParams({
      sexo,
      fechaIngreso,
      enfermedad,
    }).toString();

    const url = `${this.api}/buscar?${queryParams}`;
    return this.httpClient.get<any[]>(url);
  }

  obtenerPacientePorId(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.api}/buscar/${id}`);
  }

  actualizarPaciente(id: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    // Ajusta los encabezados según sea necesario
    headers.append('Content-Type', 'multipart/form-data');

    return this.httpClient.put<any>(`${this.api}/modify/${id}`, formData, { headers });
  }

  getRegistroDetalle(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.api}/buscar/${id}`);
  }

  eliminarRegistro(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.api}/delete/${id}`);
  }

  listarPacientes(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.api}/buscar`);
  }
  
}
