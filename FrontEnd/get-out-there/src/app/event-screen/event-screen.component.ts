import { Component, ChangeDetectorRef } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { GetDataService } from '../../../services/get-data.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MapComponent } from "../map/map.component";

@Component({
  selector: 'app-event-screen',
  standalone: true,
  imports: [NavigationBarComponent, NgFor, NgIf, CommonModule, FormsModule, MapComponent],
  templateUrl: './event-screen.component.html',
  styleUrl: './event-screen.component.css'
})
export class EventScreenComponent {
  constructor(public dataService: GetDataService, private change: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) { }
  public events: any = []
  public selectedPrice: number=0;
  ngOnInit(): void {
    this.dataService.getEvents().subscribe((events) => {
      this.events = events
    })
  }
  //tags for dropdown
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
  //handles user chosen values
  selectedTagName: string | null=""
  selectedLocation: string | null=""
  searchInput: string | null=""

  //handles the tags and gets the events based on that
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

  //handles the price and gets the events based on that
  eventsByPrice(){
    this.dataService.getEventByPrice(this.selectedPrice).subscribe((events) => {
      this.events = events;
      console.log(this.events)
      this.change.detectChanges()
    })
  }
  //handles the location and gets the events based on that
  eventsByArea(){
    this.dataService.getEventByArea(this.selectedLocation).subscribe((events) => {
      this.events = events;
    })
  }

  //navigates share button to share event page
  shareEventPage(){
    this.router.navigate(['/shareevent'])
  }

  //searched events based on the search input
  searchEvents(){
    this.dataService.getEventByName(this.searchInput).subscribe((events) => {
      this.events = events;
    })
    this.dataService.getEventByHost(this.searchInput).subscribe((events) => {
      this.events = events;
    })
  }
}



