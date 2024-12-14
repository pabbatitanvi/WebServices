import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { Event } from '../../models/events';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-event-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgMultiSelectDropDownModule, FormsModule, NavigationBarComponent, SidebarComponent],
  templateUrl: './event-edit-form.component.html',
  styleUrl: './event-edit-form.component.css'
})
export class EventEditFormComponent implements OnInit {
  eventID!: string;
  public editEvent!: string;
  public eventObj!: Event;

  constructor(public dataService: GetDataService, private router: Router, private route: ActivatedRoute) { }
  
  //default values for event form information
  public eventName: string = "Error with event name";
  public  description: string = "Error with event description";
  public  date: Date = new Date();
  public  startTime: Date = new Date();
  public  endTime: Date = new Date();
  public  tags: Array<String> = [];
  public  price: string = "Error with event price";

  //tags that are inputted in the dropdown
  tagsArray: any[] = [
    { id: 1, itemName: 'Museum' }, 
    { id: 2, itemName: 'Books' },
    { id: 3, itemName: 'Coffee' },
    { id: 4, itemName: 'History' },
    { id: 5, itemName: 'Art' },
    { id: 6, itemName: 'Nature' },
    { id: 7, itemName: 'Hiking' },
    { id: 8, itemName: 'Arcade' },
  ]

  //event form information
  eventForm = new FormGroup({
    eventName: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl(new Date()),
    startTime: new FormControl(new Date()),
    endTime: new FormControl(new Date()),
    chooseTags: new FormArray([]),
    price: new FormControl(''),

  });

  //stores the selected tags
  selected: any[] = [{ id: 1, itemName: 'Museum' }]

  //settings for the multi-select dropdown
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'itemName',
    selectAllText: '',
    unSelectAllText: '',
    allowSearchFilter: true
  };
  
  //gets tags
  get chooseTags():FormArray{
    return this.eventForm.get('chooseTags') as FormArray;
  }

  ngOnInit(): void {
    //gets teh event id from the url
    this.route.params.subscribe(params => {
      this.eventID = params['eventid']
    })
    this.eventForm = new FormGroup({
      eventName: new FormControl(''),
      description: new FormControl(''),
      date: new FormControl(new Date()),
      startTime: new FormControl(new Date()),
      endTime: new FormControl(new Date()),
      chooseTags: new FormArray([]),
      price: new FormControl(''),
  
    });

    //gets event data using the id
    let response = this.dataService.getEventByID(this.eventID).subscribe((result)=>{
      console.log("getting post data...")
      this.editEvent = result;

      this.eventObj = JSON.parse(this.editEvent);

      this.eventForm.patchValue({
        eventName: this.eventObj.eventName,
        description: this.eventObj.description,
        date: this.eventObj.date,
        startTime: this.eventObj.startTime,
        endTime: this.eventObj.endTime,
        price: this.eventObj.price
      }) 

      //calls the onSelectedTags function
      this.onSelectedTags(this.eventObj.tags);
    })
  }

  //handles the selected tags and adds them to the array
  onSelectedTags($event: any){
    console.log(':', $event)

    if(Array.isArray($event)){
      $event.forEach((tag: any) => {
        this.chooseTags.push(new FormControl(tag.itemName));
      })
    }
    else{
      this.chooseTags.push(new FormControl($event.itemName));
    }
  }

  //handles the save button, saves form details to the database
  onSave(){
    console.log("save clicked")
    console.log(this.eventForm.value);

    if(this.eventForm.valid){
      console.log("event details are sent to the backend")
      let response = this.dataService.modifyEvent(this.eventID, this.eventForm.value).subscribe((result)=> {
        console.log("backend result received at front end")
      })
    }
    else{
      console.log("oops")
    }
    this.router.navigate(['/usereventpage'])
  }
  
  //handles the close button
  onQuit(){
    this.router.navigate(['/usereventpage'])
  }
}
