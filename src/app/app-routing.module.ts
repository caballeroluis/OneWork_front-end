import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'wall',
    pathMatch: 'full'
  },
  {
    path: 'wall',
    loadChildren: () => import('./sections/wall/wall.module').then( m => m.WallModule)
  },
  {
    path: 'session',
    loadChildren: () => import('./sections/session/session.module').then( m => m.SessionModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
