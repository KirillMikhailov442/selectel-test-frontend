import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MenuComponent } from './menu.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: '**', redirectTo: '' }
];
