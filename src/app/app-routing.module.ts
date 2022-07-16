import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ // TODO: meter role guards
  {
    path: '',
    redirectTo: 'offers',
    pathMatch: 'full'
  },
  {
    path: 'offers',
    loadChildren: () => import('./sections/offer/offer.module').then( m => m.OfferModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./sections/user/user.module').then( m => m.UserModule)
  },
  {
    path: 'videocall',
    loadChildren: () => import('./sections/videocall/videocall.module').then( m => m.VideocallModule)
  },
  {
    path: 'session',
    loadChildren: () => import('./sections/session/session.module').then( m => m.SessionModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./sections/help/help.module').then( m => m.HelpModule)
  },
  {
    path: 'project',
    loadChildren: () => import('./sections/project/project.module').then( m => m.ProjectModule)
  },
  {
    path: 'terms-of-service',
    loadChildren: () => import('./sections/privacy/privacy.module').then( m => m.PrivacyModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
