import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { CursoDetailComponent } from './curso-detail/curso-detail.component';
import { CursosTableComponent } from './cursos-table/cursos-table.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    CursosComponent,
    CursoDetailComponent,
    CursosTableComponent,
  ],
  imports: [CommonModule, SharedModule, CursosRoutingModule],
})
export class CursosModule {}