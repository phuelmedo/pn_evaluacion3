import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserServiceService  } from '../../services/paciente-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscar-registro.component.html',
  styleUrl: './buscar-registro.component.css'
})
export class BuscarRegistroComponent {
  id: string = '';

  constructor(private pacienteService: UserServiceService, private router: Router) {}

  handleBuscar(): void {
    this.pacienteService.getRegistroDetalle(this.id).subscribe(resultado => {
      this.router.navigate(['registro/detalle', this.id]);
    });
  }
}