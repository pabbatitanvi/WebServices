import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataService } from '../../../services/get-data.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-share-event',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './share-event.component.html',
  styleUrl: './share-event.component.css'
})
export class ShareEventComponent {
  constructor(public dataService: GetDataService, private router: Router, private route: ActivatedRoute) { }
  selectedEventName: string | null=""
  selectedUserName: string | null=""
  public events: any = []
  public users: any = []
  public selectedEvents: any = []
  public selectedUsers: any = []
  ngOnInit(): void {
    this.dataService.getEvents().subscribe((events) => {
      this.events = events
    })
    this.dataService.getUsers().subscribe((users) => {
      this.users = users
    })
  }
  //handles event select
  onEventSelect(){
   if(this.selectedEventName){
      this.dataService.getEventByName(this.selectedEventName).subscribe((events) => {
          this.selectedEvents=events;
      })
    }
  }
  //handles user select
  onUserSelect(){
    if(this.selectedUserName){
      this.dataService.getUserByName(this.selectedUserName).subscribe((users) => {
          this.selectedUsers=users;
      })
    }
  }
  //handles close button
  onQuit(){
    this.router.navigate(['/events'])
  }
  //handles share button
  onShare(){
    this.dataService.shareEvent().subscribe((users)=>{

    })
  }
}
