// src/app/app.module.ts

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

// Importa los módulos de Angular Material que necesitas
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table'; // Importa el módulo necesario
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ToolbarComponent,
    ListaAlumnosComponent,
    AbmAlumnosComponent,
    NombreCompletoPipe // Pipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, // Importa el módulo necesario
    MatInputModule,     // Importa el módulo necesario
    MatToolbarModule,   // Importa el módulo necesario
    MatTableModule,     // Importa el módulo necesario para mat-table
    BrowserAnimationsModule // Requerido para animaciones de Angular Material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}