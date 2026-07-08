import {Routes} from '@angular/router';
import {EmployeeCreate} from './features/employee/employee-create/employee-create';

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
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/employee/employee-list/employee-list').then((m) => m.EmployeeList),
          },
          {
            path: 'create',
            loadComponent: () => import('./features/employee/employee-create/employee-create').then(m => m.EmployeeCreate)
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./features/employee/employee-detail/employee-detail').then((m) => m.EmployeeDetail),
          },

        ]
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
