import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../../services/paciente-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './detalle-registro.component.html',
  styleUrl: './detalle-registro.component.css'
})
export class DetalleRegistroComponent implements OnInit {
  id: string = '';
  registro: any;

  constructor(private route: ActivatedRoute, private router: Router, private pacienteService: UserServiceService ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fetchRegistroDetalle();
  }

  fetchRegistroDetalle(): void {
    this.pacienteService.getRegistroDetalle(this.id).subscribe(
      (data) => {
        this.registro = data;
      }
    );
  }

  handleEliminar(): void {
    this.pacienteService.eliminarRegistro(this.id).subscribe(
      () => {
        console.log('Registro eliminado exitosamente');
        this.router.navigate(['/registro/listar-todos']);
      }
    );
  }
}
