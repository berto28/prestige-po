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
import { PrintPoComponent } from './components/print-po/print-po.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { ModalAddStockComponent } from './components/modal-add-stock/modal-add-stock.component';
import { StocksTableComponent } from './components/stocks-table/stocks-table.component';
import { ModalPayComponent } from './components/modal-pay/modal-pay.component';
import { ModalViewScrapComponent } from './components/modal-view-scrap/modal-view-scrap.component';
import { ModalCuttingListComponent } from './components/modal-cutting-list/modal-cutting-list.component';
import { RadioMaterialTypeComponent } from './components/radio-material-type/radio-material-type.component';
import { ModalViewInOutStockComponent } from './components/modal-view-in-out-stock/modal-view-in-out-stock.component';

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
    PoListComponent,
    PrintPoComponent,
    PurchasesComponent,
    StocksComponent,
    ModalAddStockComponent,
    StocksTableComponent,
    ModalPayComponent,
    ModalViewScrapComponent,
    ModalCuttingListComponent,
    RadioMaterialTypeComponent,
    ModalViewInOutStockComponent
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
