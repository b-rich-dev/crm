import { Routes } from '@angular/router';
import { App } from './app';
import { Dashboard } from './dashboard/dashboard';
import { User } from './user/user';
import { UserDetails } from './user-details/user-details';

export const routes: Routes = [
    { path: 'dashboard', component: Dashboard },
    { path: 'user', component: User },
    { path: 'user/:id', component: UserDetails },
];
