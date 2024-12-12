import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { NgFor, NgIf } from '@angular/common';
import { GetDataService } from '../../../services/get-data.service';

@Component({
  selector: 'app-friend-screen',
  standalone: true,
  imports: [NavigationBarComponent, NgFor, NgIf],
  templateUrl: './friend-screen.component.html',
  styleUrl: './friend-screen.component.css'
})
export class FriendScreenComponent implements OnInit{

  constructor(public dataService: GetDataService) { }
  public searchFriends: any = []
  public currentFriends: any = []
  public recommendedFriends: any = []

  // Store info about current user
  public USEROBJ=JSON.parse(localStorage.getItem("Current_user")||"oops")

  // Initializer
  ngOnInit(): void {
    // this.dataService.getCurrentFriends(this.USEROBJ._id).subscribe((friends) => {
    //   this.currentFriends = this.USEROBJ.friends
    // })
    let tempArray = [];
    tempArray = this.USEROBJ.friends

    tempArray.forEach( (friend : string) => {
      let tempValue = this.dataService.getUserById(friend)

//      this.currentFriends[]
    });
  }


}
