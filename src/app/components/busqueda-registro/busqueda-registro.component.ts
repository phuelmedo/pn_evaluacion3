import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService  } from '../../services/paciente-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-busqueda-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './busqueda-registro.component.html',
  styleUrl: './busqueda-registro.component.css'
})
export class BusquedaRegistroComponent implements OnInit {
  sexo: string = '';
  fechaIngreso: string = '';
  enfermedad: string = '';
  pacientes: any[] = [];
  busquedaRealizada: boolean = false;

  constructor(private pacienteService: UserServiceService, private router: Router, private sharedDataService: SharedDataService) {}

  ngOnInit(): void {}

  handleBuscar(): void {
    this.pacienteService.listarPacientesPersonalizada(this.sexo, this.fechaIngreso, this.enfermedad)
      .subscribe(
        (data: any[]) => {
          this.pacientes = data;
          this.busquedaRealizada = true;
          this.sharedDataService.actualizarFiltro({
            sexo: this.sexo,
            fechaIngreso: this.fechaIngreso,
            enfermedad: this.enfermedad,
          });

          this.router.navigate(['/registro/listar'], {
            state: {
              pacientesFiltrados: data,
            },
          });
        },
        (error) => {
          console.error('Error en la búsqueda de pacientes:', error);
        }
      );

  }
  verDetalle(id: string): void {
    this.router.navigate(['/paciente/detalle', id]);
  }
}