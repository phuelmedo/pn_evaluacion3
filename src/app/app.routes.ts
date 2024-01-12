import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NuevoRegistroComponent } from './components/nuevo-registro/nuevo-registro.component';
import { ActualizarRegistroComponent } from './components/actualizar-registro/actualizar-registro.component';
import { ListarRegistroComponent } from './components/listar-registro/listar-registro.component';
import { DetalleRegistroComponent } from './components/detalle-registro/detalle-registro.component';
import { BuscarRegistroComponent } from './components/buscar-registro/buscar-registro.component';
import { BusquedaRegistroComponent } from './components/busqueda-registro/busqueda-registro.component';
import { ListarRegistrosComponent } from './components/listar-registros/listar-registros.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'registro/nuevo', component: NuevoRegistroComponent },
    { path: 'registro/actualizar/:id', component: ActualizarRegistroComponent },
    { path: 'registro/detalle/:id', component: DetalleRegistroComponent },
    { path: 'registro/buscar', component: BuscarRegistroComponent },
    { path: 'registro/buscar/:search', component: BusquedaRegistroComponent },
    { path: 'registro/listar', component: ListarRegistroComponent },
    { path: 'registro/listar-todos', component: ListarRegistrosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }
