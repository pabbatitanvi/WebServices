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
import { PostEditFormComponent } from './post-edit-form/post-edit-form.component';
import { UserSettingsPageComponent } from './user-settings-page/user-settings-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserEventPageComponent } from './user-event-page/user-event-page.component';
import { EventEditFormComponent } from './event-edit-form/event-edit-form.component';
import { ShareEventComponent } from './share-event/share-event.component';
import { UserPostPageComponent } from './user-post-page/user-post-page.component';

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},//This means that when the path is empty after the 4200 in the url, it redirects to the /home url, loading the home screen
    {path:'login', component: LoginScreenComponent},
    {path:'loginpage', component: LoginFormComponent},
    {path:'home', component: HomeScreenComponent},
    {path: 'userprofile', component: UserScreenComponent},
    {path: 'friends', component:FriendScreenComponent},
    {path: 'events', component:EventScreenComponent},
    {path: 'createaccount', component: UserFormComponent},
    {path: 'eventform', component: EventFormComponent},
    {path: 'usereventpage', component: UserEventPageComponent},
    {path: 'usereditform/:eventid', component: EventEditFormComponent},
    {path: 'postform', component: PostFormComponent},
    {path: 'userpostpage', component: UserPostPageComponent},
    {path: 'posteditform/:postid', component: PostEditFormComponent},
    {path: 'modifyprofile', component: UserSettingsPageComponent},
    {path: 'shareevent', component:ShareEventComponent},
    {path: 'userpostpage', component: UserPostPageComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
