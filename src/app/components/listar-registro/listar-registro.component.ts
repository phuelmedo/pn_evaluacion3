import { Component, OnInit } from '@angular/core';
import { UserServiceService  } from '../../services/paciente-service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../services/shared-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-registro',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './listar-registro.component.html',
  styleUrl: './listar-registro.component.css'
})
export class ListarRegistroComponent implements OnInit{
  pacientes: any[] = [];
  filtroSubscription: Subscription = new Subscription();

  constructor(private router: Router, private pacienteService: UserServiceService, private sharedDataService: SharedDataService ) {}

  ngOnInit(): void {
    this.filtroSubscription = this.sharedDataService.filtro$.subscribe((filtro) => {
      this.listarPacientesFiltrados(filtro);
    });
  }

  ngOnDestroy(): void {
    this.filtroSubscription.unsubscribe();
  }

  listarPacientesFiltrados(filtro: { sexo: string; fechaIngreso: string; enfermedad: string }): void {
    this.pacienteService.listarPacientesPersonalizada(filtro.sexo, filtro.fechaIngreso, filtro.enfermedad).subscribe(
      (data) => {
        this.pacientes = data;
      },
      (error) => {
        console.error('Error al obtener la lista de pacientes:', error);
      }
    );
  }
}
