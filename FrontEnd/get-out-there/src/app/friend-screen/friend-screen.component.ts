import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { GetDataService } from '../../../services/get-data.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-friend-screen',
  standalone: true,
  imports: [NavigationBarComponent, FormsModule, CommonModule, NgFor, NgIf],
  templateUrl: './friend-screen.component.html',
  styleUrl: './friend-screen.component.css'
})
export class FriendScreenComponent implements OnInit{

  constructor(public dataService: GetDataService) { }
  public findFriends: any = []
  public currentFriends: any = []
  public usernameFriends: any = []
  public recommendedFriends: any = []

  public myObj!: User;// for the parsing process when getting the existing information about the post to edit

  // Store info about current user
  public USEROBJ=JSON.parse(localStorage.getItem("Current_user")||"oops")

  // Initializer
  ngOnInit(): void {
    let tempArray = [];
    tempArray = this.USEROBJ.friends

    // All this mess of several arrays iterating and copying into each other is just to get the array currentFriends to be an
    //array containing FULL USER INFORMATION of each friend.
    tempArray.forEach( (friend : any, index : any) => {
      this.dataService.getUserById(friend).subscribe((tempValue) => {
        
        let myObj = JSON.parse(tempValue);
        
        this.currentFriends[index] = myObj;
        console.log("friend #", index, "is", this.currentFriends[index], "with username", this.currentFriends[index].username);
      })
    });

    // Setting up recommended friends
    console.log("Tags sending: ", this.USEROBJ.chooseTags)
    this.dataService.recommendFriends(this.USEROBJ.chooseTags).subscribe((recommendations) => {
      this.recommendedFriends = recommendations;
    })
  }
  searchInput: string | null=""
  searchFriends(){
    this.dataService.getUserByName(this.searchInput).subscribe((friend) => {
      this.usernameFriends = friend;
    })
  }
  onAdd(userid:any, username:any){
    const userID = userid.toString()
    this.dataService.addFriends(userID, username).subscribe((result) => {
      console.log("friend added")
      // window.location.reload();
    })
  }
}
