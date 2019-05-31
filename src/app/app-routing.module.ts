import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { SupplierSectionTypeComponent } from './components/supplier-section-type/supplier-section-type.component';

const routes: Routes = [
  { 
    path: 'canvas', 
    component: CanvasComponent
    // loadChildren: './lazy-loading/canvas/canvas.module#CanvasModule'
  },
  {
    path: 'projects',
    component: ProjectsComponent
    // loadChildren: './lazy-loading/projects/projects.module#ProjectsModule'
  },
  {
    path: 'suppliers',
    component: SupplierComponent
    // loadChildren: './lazy-loading/projects/projects.module#ProjectsModule'
  },
  {
    path: 'purchases',
    component: PurchasesComponent
    // loadChildren: './lazy-loading/projects/projects.module#ProjectsModule'
  },
  {
    path: '',
    component: ProjectsComponent
  },
  {
    path: 'stocks',
    component: StocksComponent
  },
  {
    path: 'supplier-section-type',
    component: SupplierSectionTypeComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
