import { Routes } from '@angular/router';
import { environment } from '@environment';

import { orderFlowGuard } from './guards/order-flow.guard';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    title: () => `${environment.TITLE_PREFIX} | Home`,
    component: HomeComponent,
  },
  {
    path: 'order',
    title: () => `${environment.TITLE_PREFIX} | Order`,
    canMatch: [orderFlowGuard],
    loadComponent: () => import('./views/order/order.component').then((c) => c.OrderComponent),
  },
  {
    path: 'review',
    title: () => `${environment.TITLE_PREFIX} | Review`,
    canMatch: [orderFlowGuard],
    loadComponent: () => import('./views/review/review.component').then((c) => c.ReviewComponent),
  },
  {
    path: '**',
    title: () => `${environment.TITLE_PREFIX} | Not Found`,
    loadComponent: () => import('./views/not-found/not-found.component').then((c) => c.NotFoundComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
