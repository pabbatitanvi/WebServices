import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { NgFor /*, CommonModule */ } from '@angular/common';
import { GetDataService } from '../../../services/get-data.service';
import { MapComponent } from 'ng-openlayers';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [NavigationBarComponent, NgFor, MapComponent],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})

// Much of this is copied from the user-post-page, where the posts are implemented in a similar way. I've commented out parts that
//don't seem immediately useful, but might become necessary later.
export class HomeScreenComponent implements OnInit{

  constructor(public dataService: GetDataService /*, private router:Router */ ) { }
  public locations: any = []
  public events: any = []
  ngOnInit(): void {
    this.dataService.getLocations().subscribe((locations) => {
      this.locations = locations
    })
    this.dataService.getEvents().subscribe((events) => {
      this.events = events
    })
  }
}
