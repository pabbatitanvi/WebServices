import { Component } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { GetDataService } from '../../../services/get-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-screen',
  standalone: true,
  imports: [NavigationBarComponent, NgFor, NgIf, CommonModule, FormsModule],
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
  public tagsArray: any[] = [
    { id: 1, itemName: 'Museum' }, 
    { id: 2, itemName: 'Books' },
    { id: 3, itemName: 'Coffee' },
    { id: 4, itemName: 'History' },
    { id: 5, itemName: 'Art' },
    { id: 6, itemName: 'Nature' },
    { id: 7, itemName: 'Hiking' },
    { id: 8, itemName: 'Arcade' },
  ]
  selectedTagName: string | null=""

  onTagSelect(){
    if(this.selectedTagName === "All"){
      this.dataService.getEvents().subscribe((events) => {
        this.events = events
      })
    }  
    else if(this.selectedTagName){
      this.dataService.getEventByTag(this.selectedTagName).subscribe((events) => {
        this.events = events
      })
    }
  }
}



