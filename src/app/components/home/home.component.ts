import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/paciente-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ultimosPacientes: any[] = [];

  constructor(private pacienteService: UserServiceService) {}

  ngOnInit(): void {
    this.obtenerUltimosPacientes();
  }

  obtenerUltimosPacientes(): void {
    this.pacienteService.listarPacientes().subscribe(
      (pacientes: any[]) => {
        this.ultimosPacientes = pacientes.slice(0, 5);
      },
      error => {
        console.error('Error al obtener últimos pacientes:', error);
      }
    );
  }
}