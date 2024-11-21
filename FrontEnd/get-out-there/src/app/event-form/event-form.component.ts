import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetDataService } from '../../../services/get-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgMultiSelectDropDownModule, FormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent {
  constructor(public dataService: GetDataService, private router: Router) { }
  ngOnInit(): void {
    
  }
  tagsArray: any[] = [{ id: 1, itemName: 'Museum' }, 
    { id: 2, itemName: 'Books' },
    { id: 3, itemName: 'Coffee' },
    { id: 4, itemName: 'History' },
    { id: 5, itemName: 'Art' }
  ]

  eventForm = new FormGroup({
    eventName: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    chooseTags: new FormArray([]),  
});


  selected: any[] = [{ id: 1, itemName: 'Museum' }]

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'itemName',
    selectAllText: '',
    unSelectAllText: '',
    allowSearchFilter: true
  };

  get chooseTags():FormArray{
    return this.eventForm.get('chooseTags') as FormArray;
  }

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

  onSubmit(){
    console.log("submit clicked")
    console.log(this.eventForm.value);
    if(this.eventForm.valid){
      console.log("event details are sent to the backend")
      let response = this.dataService.createEvent(this.eventForm.value).subscribe((result)=> {
        console.log("backend result received at front end")
      })
    }
    else{
      console.log("oops")
    }
 }
 onQuit(){
  this.router.navigate(['/userprofile'])
}
}

