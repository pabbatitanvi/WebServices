import { Component } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings-page',
  standalone: true,
  imports: [NavigationBarComponent, CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './user-settings-page.component.html',
  styleUrl: './user-settings-page.component.css'
})
export class UserSettingsPageComponent {
    constructor(private router:Router){}
  
  userForm = new FormGroup({
    chooseTags: new FormArray([]),
    //user fields
    profilename: new FormControl(''),
    profileBio: new FormControl(' ')
    //friends: new FormArray([]),
  });
  onQuit(){
    this.router.navigate(['/userprofile'])
  }
}
