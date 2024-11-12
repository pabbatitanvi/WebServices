import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})


export class UserFormComponent {

  tagsArray: string[] = ['Museum', 'Books', 'Coffee', 'History', 'Art'];

  userForm = new FormGroup({
    userType: new FormControl('User'),
    username: new FormControl(''),
    password: new FormControl(''),
    chooseTags: new FormArray([]),
    //user fields
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
    friends: new FormArray([]),
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
  // this.funcChooseTags(this.tagsArray);

  // funcChooseTags(tags: string[]){
  //   const controls = tags.map(() => new FormControl(false));
  //   const tagFormArray = new FormArray(controls);
  //   this.userForm.setControl('chooseTags', tagFormArray);
  // }

  // get chooseTags() {
  //   return this.userForm.get('chooseTags') as FormArray;
  // }
  
}
