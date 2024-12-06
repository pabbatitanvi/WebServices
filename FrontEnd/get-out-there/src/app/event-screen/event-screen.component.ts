import { Component, ChangeDetectorRef } from '@angular/core';
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
  constructor(public dataService: GetDataService, private change: ChangeDetectorRef) { }
  public events: any = []
  public selectedPrice: number=0;
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
  selectedLocation: string | null=""
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
  eventsByPrice(){
    this.dataService.getEventByPrice(this.selectedPrice).subscribe((events) => {
      this.events = events;
      console.log(this.events)
      this.change.detectChanges()
    })
  }
  eventsByArea(){
    this.dataService.getEventByArea(this.selectedLocation).subscribe((events) => {
      this.events = events;
    })
  }
}



