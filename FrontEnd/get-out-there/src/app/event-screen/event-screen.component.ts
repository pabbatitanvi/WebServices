import { Component } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";

@Component({
  selector: 'app-event-screen',
  standalone: true,
  imports: [NavigationBarComponent],
  templateUrl: './event-screen.component.html',
  styleUrl: './event-screen.component.css'
})
export class EventScreenComponent {

}
