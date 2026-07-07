import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./core/layout/auth-layout/auth-layout').then(
        (m) => m.AuthLayout
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/auth/login/login').then((m) => m.Login),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/main-layout/main-layout').then(
        (m) => m.MainLayout
      ),
    children: [
      {
        path: 'employees',
        loadComponent: () =>
          import('./features/home/home').then((m) => m.Home),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
