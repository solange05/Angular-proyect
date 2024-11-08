import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'; // Rutas 
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from './components/abm-alumnos/abm-alumnos.component';
import { NombreCompletoPipe } from './nombre-completo.pipe'; // Pipe


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaClasesComponent } from './components/lista-clases/lista-clases.component';
import { AbmClasesComponent } from './components/abm-clases/abm-clases.component';
import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';
import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ToolbarComponent,
    ListaAlumnosComponent,
    AbmAlumnosComponent,
    NombreCompletoPipe,
    ListaClasesComponent,
    AbmClasesComponent,
    ListaCursosComponent,
    AbmCursosComponent // Pipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,     
    MatToolbarModule,   
    MatTableModule,     
    BrowserAnimationsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}