import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/landing/landing.module').then( m => m.LandingPageModule) // src\app\login\landing\landing.module.ts
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./login/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./login/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./login/password-reset/password-reset.module').then( m => m.PasswordResetPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./login/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'email-verification',
    loadChildren: () => import('./login/email-verification/email-verification.module').then( m => m.EmailVerificationPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
