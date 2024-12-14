import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { FormsModule } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, NgMultiSelectDropDownModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})


export class UserFormComponent {
  //tags for dropdown
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
  
  userForm = new FormGroup({
    userType: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    chooseTags: new FormArray([]),
    //user fields
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
    //organization fields
    organizationName: new FormControl(''),
    chooseMembership: new FormControl(''),
    location: new FormControl('')

  });

  
  userTypes = ['User', 'Organization'];

  //handles which input fields are displayed based on the radio button chosen
  onUser(){
    const uType = this.userForm.get('userType')?.value
    if (uType == 'Organization') {
      this.userForm.get('organizationName')?.enable();
      this.userForm.get('chooseMembership')?.enable();
      this.userForm.get('location')?.enable();
    }
    else if (uType == 'User'){
      this.userForm.get('firstName')?.enable();
      this.userForm.get('middleName')?.enable();
      this.userForm.get('lastName')?.enable();
    }
    else{
      this.userForm.get('firstName')?.disable();
      this.userForm.get('middleName')?.disable();
      this.userForm.get('lastName')?.disable();
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
  //handles tags
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

  constructor(public dataService: GetDataService, private router: Router) { }
  //handles submit button, create user in the database
  onSubmit(){
    console.log(this.userForm.value)
    if(this.userForm.valid){
      console.log("sent to backend")
      let response = this.dataService.createNewUser(this.userForm.value).subscribe((result)=>{
        console.log("backend result received at front end")

      })
    }
    else{
      console.log("oops")
    }
  }
  //handels close button
  onQuit(){
    this.router.navigate(['/login'])
  }
  
}
