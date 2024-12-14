import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetDataService } from '../../../services/get-data.service';
import { Router } from '@angular/router';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgMultiSelectDropDownModule, FormsModule, NavigationBarComponent, SidebarComponent],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent {
  constructor(public dataService: GetDataService, private router: Router) { }
  
  //gets the logged in userobj
  public USEROBJ=JSON.parse(localStorage.getItem("Current_user")||"oops")
  ngOnInit(): void {
    
  }

  //tags dropdown
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

  //event form for event details
  eventForm = new FormGroup({
    eventName: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl(new Date()),
    startTime: new FormControl(new Date()),
    endTime: new FormControl(''),
    chooseTags: new FormArray([]),
    price: new FormControl(null),
    organization: new FormControl(''),
    location: new FormControl(''),
  });

  //stores the choosen selected tags
  selected: any[] = [{ id: 1, itemName: 'Museum' }]

  //tags dopdown settings
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'itemName',
    selectAllText: '',
    unSelectAllText: '',
    allowSearchFilter: true
  };

  //gets the tags
  get chooseTags():FormArray{
    return this.eventForm.get('chooseTags') as FormArray;
  }

  //handles selected tags
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

  //submit button to add the details to the database
  onSubmit(){
    console.log("submit clicked")
    console.log(this.eventForm.value);

    this.eventForm.patchValue({
      organization: this.USEROBJ._id
    })

    if(this.eventForm.valid){
      console.log("event details are sent to the backend")
      let response = this.dataService.createEvent(this.eventForm.value).subscribe((result)=> {
        console.log("backend result received at front end")
      })
    }
    else{
      console.log("oops")
    }
    this.router.navigate(['/userprofile'])
  }
 
  //handles close button
  onQuit(){
    this.router.navigate(['/userprofile'])
  }
}

