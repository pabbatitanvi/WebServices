import { Component } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-settings-page',
  standalone: true,
  imports: [NavigationBarComponent, CommonModule],
  templateUrl: './user-settings-page.component.html',
  styleUrl: './user-settings-page.component.css'
})
export class UserSettingsPageComponent {
  userForm = new FormGroup({
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
}
