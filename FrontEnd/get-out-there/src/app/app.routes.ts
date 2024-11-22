import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserScreenComponent } from './user-screen/user-screen.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { FriendScreenComponent } from './friend-screen/friend-screen.component';
import { EventScreenComponent } from './event-screen/event-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { UserFormComponent } from './user-form/user-form.component';
import { EventFormComponent } from './event-form/event-form.component';
import { PostFormComponent } from './post-form/post-form.component';

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},//This means that when the path is empty after the 4200 in the url, it redirects to the /home url, loading the home screen
    {path:'login', component: LoginScreenComponent},
    {path:'home', component: HomeScreenComponent},
    {path: 'userprofile', component: UserScreenComponent},
    {path: 'friends', component:FriendScreenComponent},
    {path: 'events', component:EventScreenComponent},
    {path: 'createaccount', component: UserFormComponent},
    {path: 'eventform', component: EventFormComponent},
    {path: 'postform', component: PostFormComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
