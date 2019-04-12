import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CanvasRoutingModule } from './canvas-routing.module';
import { CanvasComponent } from '../../components/canvas/canvas.component';
import { CanvasTableComponent } from '../../components/canvas-table/canvas-table.component';
import { CanvasAddComponent } from '../../components/canvas-add/canvas-add.component';
import { ModalUpdateComponent } from '../../components/modal-update/modal-update.component';
import { ModalDeleteComponent } from '../../components/modal-delete/modal-delete.component';
// import { DropdownColorComponent } from '../../components/dropdown-color/dropdown-color.component';

@NgModule({
  declarations: [
    CanvasComponent,
    CanvasTableComponent,
    CanvasAddComponent,
    ModalUpdateComponent,
    ModalDeleteComponent,
    // DropdownColorComponent
  ],
  imports: [
    CommonModule,
    CanvasRoutingModule,
    FormsModule
  ]
})
export class CanvasModule { }
