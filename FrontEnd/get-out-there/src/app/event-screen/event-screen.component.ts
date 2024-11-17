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
  public events: any = [
    {"name" : "EVENT 1", "id" : 1},
    {"name" : "EVENT 2", "id" : 2} ,
    {"name" : "EVENT 3", "id" : 3}, 
    {"name" : "EVENT 4", "id" : 4},
  ]
}



