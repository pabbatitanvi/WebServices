import { Component } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { GetDataService } from '../../../services/get-data.service';
import {ObjectId} from 'mongodb';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-user-event-page',
  standalone: true,
  imports: [NavigationBarComponent, NgFor, NgIf, CommonModule, SidebarComponent],
  templateUrl: './user-event-page.component.html',
  styleUrl: './user-event-page.component.css'
})
export class UserEventPageComponent {
  constructor(public dataService: GetDataService, private router: Router) { }
  public events: any = []
  public USEROBJ=JSON.parse(localStorage.getItem("Current_user")||"oops")
  ngOnInit(): void {
    this.dataService.getEventByOrgId(this.USEROBJ._id).subscribe((events) => {
      this.events = events
    })
    console.log(this.USEROBJ._id)
  }
  //handles delete button
  onDeleteEvent(eventID: ObjectId){
    this.dataService.deleteEvent(eventID).subscribe((result)=>{})
  }
  //handles modify button
  onModifyEvent(eventID: ObjectId){
    this.router.navigate(['/usereditform/' + eventID])
  }
}
