import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { LazyForDirective } from './directive/lazy-for.directive';
import { ModalAddPoComponent } from './components/modal-add-po/modal-add-po.component';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { ProjectsAddComponent } from './components/projects-add/projects-add.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { DropdownColorComponent } from './components/dropdown-color/dropdown-color.component';
import { CanvasTableComponent } from './components/canvas-table/canvas-table.component';
import { CanvasAddComponent } from './components/canvas-add/canvas-add.component';
import { ModalUpdateComponent } from './components/modal-update/modal-update.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { PoListComponent } from './components/po-list/po-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LazyForDirective,
    ModalAddPoComponent,
    ProjectsTableComponent,
    ProjectsAddComponent,
    CanvasComponent,
    DropdownColorComponent,
    CanvasTableComponent,
    CanvasAddComponent,
    ModalUpdateComponent,
    ModalDeleteComponent,
    ProjectsComponent,
    SupplierComponent,
    PoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
