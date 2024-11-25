import { Component } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-settings-page',
  standalone: true,
  imports: [NavigationBarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './user-settings-page.component.html',
  styleUrl: './user-settings-page.component.css'
})
export class UserSettingsPageComponent {
  userForm = new FormGroup({
    chooseTags: new FormArray([]),
    //user fields
    profilename: new FormControl(''),
    profileBio: new FormControl(' ')
    //friends: new FormArray([]),
  });
}
