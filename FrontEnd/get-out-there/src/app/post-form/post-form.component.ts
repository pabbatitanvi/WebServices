import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { FormsModule } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, NgMultiSelectDropDownModule, FormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})

export class PostFormComponent {

  tagsArray: any[] = [{ id: 1, itemName: 'Museum' }, 
                      { id: 2, itemName: 'Books' },
                      { id: 3, itemName: 'Coffee' },
                      { id: 4, itemName: 'History' },
                      { id: 5, itemName: 'Art' }
                    ]

  postForm = new FormGroup({
    postName: new FormControl(''),
    description: new FormControl(''),
    chooseTags: new FormArray([]),
    location: new FormControl('')

  });

  /*
  onUser(){
      this.userForm.get('firstName')?.disable();
      this.userForm.get('middleName')?.disable();
      this.userForm.get('lastName')?.disable();
      this.userForm.get('organizationName')?.disable();
      this.userForm.get('chooseMembership')?.disable();
      this.userForm.get('location')?.disable();
  }*/

  selected: any[] = [{ id: 1, itemName: 'Museum' }]

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'itemName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true
  };
  
  get chooseTags():FormArray{
    return this.postForm.get('chooseTags') as FormArray;
  }
  onSelectedTags($event: any){
    console.log(':', $event)


    $event.forEach((tag: any) => {
      this.chooseTags.push(new FormControl(tag.itemName));
    })
  }


  
  constructor(public dataService: GetDataService) { }
  onSubmit(){
    console.log(this.postForm.value)
    
  }
}
