import { Component } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";//this imports the nav bar component into this file allowing its use here
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-screen',
  standalone: true,
  imports: [NavigationBarComponent, NgFor, NgIf], //mentioning the objects to import from the imported components
  templateUrl: './user-screen.component.html',
  styleUrl: './user-screen.component.css'
})
export class UserScreenComponent {
  public posts: any = [
    {"name" : "POST 1", "Description" : "Paris", "id" : 1},
    {"name" : "POST 2", "Description" : "London", "id" : 2} ,
    {"name" : "POST 3", "Description" : "Rome", "id" : 3}, 
    {"name" : "POST 4", "Description" : "Berlin", "id" : 4}, 
    {"name" : "POST 5", "Description" : "Berlin", "id" :5},
    {"name" : "POST 6", "Description" : "Berlin", "id" : 6},
    {"name" : "POST 7", "Description" : "Berlin", "id" : 7},
    {"name" : "POST 8", "Description" : "Berlin", "id" : 8},
    {"name" : "POST 9", "Description" : "Berlin", "id" : 9},
  ]
  public current_user:any=[
    {"usertype":"user", 
     "username":"Dragonfable",
     "userinfo":"Software Engineer, PSU '25"
    }


  ]
}
