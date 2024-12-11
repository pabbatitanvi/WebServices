import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";//this imports the nav bar component into this file allowing its use here
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GetDataService } from '../../../services/get-data.service';
import {ObjectId} from 'mongodb';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-user-post-page',
  standalone: true,
  imports: [NavigationBarComponent, NgFor, NgIf, CommonModule, FormsModule, SidebarComponent],
  templateUrl: './user-post-page.component.html',
  styleUrl: './user-post-page.component.css'
})
export class UserPostPageComponent {

}
