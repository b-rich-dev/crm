import { Routes } from '@angular/router';
import { App } from './app';
import { Dashboard } from './dashboard/dashboard';
import { User } from './user/user';

export const routes: Routes = [
    { path: 'dashboard', component: Dashboard },
    { path: 'user', component: User },
];
