import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, NgMultiSelectDropDownModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})


export class UserFormComponent {

  tagsArray: any[] = [{ id: 1, itemName: 'Museum' }, 
                      { id: 2, itemName: 'Books' },
                      { id: 3, itemName: 'Coffee' },
                      { id: 4, itemName: 'History' },
                      { id: 5, itemName: 'Art' }
                    ]

  userForm = new FormGroup({
    userType: new FormControl('User'),
    username: new FormControl(''),
    password: new FormControl(''),
    chooseTags: new FormArray([]),
    //user fields
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
    //friends: new FormArray([]),
    //organization fields
    organizationName: new FormControl(''),
    chooseMembership: new FormControl(''),
    location: new FormControl('')

  });

  
  userTypes = ['User', 'Organization'];

  
  onUser(user: string){
    const uType = this.userForm.get('userType')?.value
    if (uType == 'Organization') {
      this.userForm.get('organizationName')?.enable();
      this.userForm.get('chooseMembership')?.enable();
      this.userForm.get('location')?.enable();
    }
    else{
      this.userForm.get('organizationName')?.disable();
      this.userForm.get('chooseMembership')?.disable();
      this.userForm.get('location')?.disable();
    }
  }

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
    return this.userForm.get('chooseTags') as FormArray;
  }
  onSelectedTags($event: any){
    console.log(':', $event)

    this.chooseTags.clear();

    $event.forEach((tag: any) => {
      this.chooseTags.push(new FormControl(tag.itemName));
    })
  }
  
}
