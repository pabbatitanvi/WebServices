import { Routes } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';

export const routes: Routes = [
    { path: '', component: LoginScreenComponent},
    { path: 'home-screen', component: HomeScreenComponent}
];
