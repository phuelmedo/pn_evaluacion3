import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService  } from '../../services/paciente-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './actualizar-registro.component.html',
  styleUrl: './actualizar-registro.component.css'
})
export class ActualizarRegistroComponent implements OnInit {
  formulario: FormGroup;
  fotoPersonalUrl: string | null = null;
  pacienteId: string = '';
  submitted: boolean = false;

  constructor( private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private pacienteService: UserServiceService) {
    this.formulario = this.fb.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      edad: [null, Validators.required],
      sexo: [''],
      fotoPersonal: [null],
      enfermedad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pacienteId = params['id'];
      this.obtenerInformacionPaciente();
    });
  }

  obtenerInformacionPaciente(): void {
    this.pacienteService.obtenerPacientePorId(this.pacienteId).subscribe(
      (paciente) => {
        console.log('Información del paciente:', paciente);
  
        this.formulario.patchValue({
          rut: paciente.rut,
          nombre: paciente.nombre,
          edad: paciente.edad,
          sexo: paciente.sexo,
          enfermedad: paciente.enfermedad,
        });
  
        this.fotoPersonalUrl = paciente.fotoPersonal;
        console.log('Valores del formulario:', this.formulario.value);
        console.log('URL de la foto personal:', this.fotoPersonalUrl);
      }
    );
  }

  handleFotoChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const isValidFileType = this.isValidFileType(file);
      const isSizeValid = this.isSizeValid(file);

      if (!isValidFileType) {
        window.alert('Solo se permiten archivos JPEG, PNG y GIF.');
        return;
      }

      if (!isSizeValid) {
        window.alert('El tamaño del archivo supera el límite permitido (20 MB).');
        return;
      }

      this.fotoPersonalUrl = URL.createObjectURL(file);
      this.formulario.patchValue({ fotoPersonal: file });
    }
  }

  private isValidFileType(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedTypes.includes(file.type);
  }

  private isSizeValid(file: File): boolean {
    const maxSize = 20 * 1024 * 1024;
    return file.size <= maxSize;
  }

  showErrors(controlName: string): boolean {
    const control = this.formulario.get(controlName);
    return this.submitted && control ? control.invalid : false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.formulario.valid) {
      const formData = new FormData();

      formData.append('rut', this.formulario.get('rut')?.value);
      formData.append('nombre', this.formulario.get('nombre')?.value);
      formData.append('edad', this.formulario.get('edad')?.value.toString());
      formData.append('sexo', this.formulario.get('sexo')?.value);
      formData.append('enfermedad', this.formulario.get('enfermedad')?.value);

      const fotoPersonal = this.formulario.get('fotoPersonal')?.value;
      if (fotoPersonal instanceof File) {
        formData.append('fotoPersonal', fotoPersonal);
      }

      this.pacienteService.actualizarPaciente(this.pacienteId, formData).subscribe(
        () => {
          console.log('Paciente actualizado exitosamente');
          this.router.navigate(['/registro/listar']);
        }
      );
    } else {
      console.log('Formulario no válido. Por favor, corrija los errores.');
      window.alert('Complete todos los campos obligatorios');
    }
  }
}