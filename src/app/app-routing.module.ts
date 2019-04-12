import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ProjectsComponent } from './components/projects/projects.component';

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
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
