import { Component } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";

@Component({
  selector: 'app-friend-screen',
  standalone: true,
  imports: [NavigationBarComponent],
  templateUrl: './friend-screen.component.html',
  styleUrl: './friend-screen.component.css'
})
export class FriendScreenComponent {

}
