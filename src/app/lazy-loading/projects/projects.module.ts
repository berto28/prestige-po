import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { ProjectsAddComponent } from '../../components/projects-add/projects-add.component';
import { ProjectsTableComponent } from '../../components/projects-table/projects-table.component';
import { ModalAddPoComponent } from '../../components/modal-add-po/modal-add-po.component';
import { DropdownColorComponent } from '../../components/dropdown-color/dropdown-color.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectsAddComponent,
    ProjectsTableComponent,
    ModalAddPoComponent,
    DropdownColorComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    FormsModule
  ]
})
export class ProjectsModule { }
