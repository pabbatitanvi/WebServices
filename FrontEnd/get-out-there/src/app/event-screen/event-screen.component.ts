import { Component } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { GetDataService } from '../../../services/get-data.service';

@Component({
  selector: 'app-event-screen',
  standalone: true,
  imports: [NavigationBarComponent, NgFor, NgIf, CommonModule],
  templateUrl: './event-screen.component.html',
  styleUrl: './event-screen.component.css'
})
export class EventScreenComponent {
  constructor(public dataService: GetDataService) { }
  public events: any = []
  ngOnInit(): void {
    this.dataService.getEvents().subscribe((events) => {
      this.events = events
    })
  }
  // public events: any = [
  //   {"name" : "EVENT 1", "location" : "Museum", "id" : 1},
  //   {"name" : "EVENT 2", "location" : "Park", "id" : 2} ,
  //   {"name" : "EVENT 3", "location" : "Park", "id" : 3}, 
  //   {"name" : "EVENT 4", "location" : "Hiking Trail", "id" : 4},
  // ]
}



