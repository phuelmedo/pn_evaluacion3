import { Component, OnInit } from '@angular/core';
import { UserServiceService  } from '../../services/paciente-service.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-registros',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-registros.component.html',
  styleUrl: './listar-registros.component.css'
})
export class ListarRegistrosComponent implements OnInit{
  pacientes: any[] = [];

  constructor(private router: RouterModule, private pacienteService: UserServiceService) {}

  ngOnInit(): void {
    this.listarPacientes();
  }

  listarPacientes(): void {
    this.pacienteService.listarPacientes().subscribe(
      (data) => {
        this.pacientes = data;
      },
      (error) => {
        console.error('Error al obtener la lista de pacientes:', error);
      }
    );
  }
}
