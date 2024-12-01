import { Component } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { GetDataService } from '../../../services/get-data.service';
import {ObjectId} from 'mongodb';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-event-page',
  standalone: true,
  imports: [NavigationBarComponent, NgFor, NgIf, CommonModule],
  templateUrl: './user-event-page.component.html',
  styleUrl: './user-event-page.component.css'
})
export class UserEventPageComponent {
  constructor(public dataService: GetDataService, private router: Router) { }
  public events: any = []
  ngOnInit(): void {
    this.dataService.getEvents().subscribe((events) => {
      this.events = events
    })
  }
  onDeleteEvent(eventID: ObjectId){
    this.dataService.deleteEvent(eventID).subscribe((result)=>{})
  }
}
