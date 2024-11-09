import { Component } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";//this imports the nav bar component into this file allowing its use here

@Component({
  selector: 'app-user-screen',
  standalone: true,
  imports: [NavigationBarComponent], //mentioning the objects to import from the imported components
  templateUrl: './user-screen.component.html',
  styleUrl: './user-screen.component.css'
})
export class UserScreenComponent {

}
