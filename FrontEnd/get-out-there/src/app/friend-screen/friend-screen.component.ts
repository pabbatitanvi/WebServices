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
    if(tempArray == undefined){
      console.log("current user has no friends...yet!")
    } else{
      tempArray.forEach( (friend : any, index : any) => {
        this.dataService.getUserById(friend).subscribe((tempValue) => {
          
          let myObj = JSON.parse(tempValue);
          
          this.currentFriends[index] = myObj;
          //console.log("friend #", index, "is", this.currentFriends[index], "with username", this.currentFriends[index].username);
        })
      });
    }

    // Setting up recommended friends
    console.log("Tags sending: ", this.USEROBJ.chooseTags)
    this.dataService.recommendFriends(this.USEROBJ.chooseTags).subscribe((recommendations) => {

      // The intention is for this to eventually filter current friends from the friend recommendations
      this.recommendedFriends = this.removeCommonElements(recommendations, this.currentFriends);
    })
  }

  //stores search input
  searchInput: string | null=""
  //gets the friends information based on search
  searchFriends(){
    this.dataService.getUserByName(this.searchInput).subscribe((friend) => {
      this.usernameFriends = friend;
    })
  }

  //handles add button
  onAdd(userid:any, username:any){
    const userID = userid.toString()
    this.dataService.addFriends(userID, username).subscribe((result) => {
      console.log("friend added")
      console.log(result, " this is likely the problem")
      // window.location.reload();
      // We have now updated the user, so we need to get this user again
      this.dataService.getUserById(userID).subscribe((result) => {
        console.log("RESULT USER: ", result)
        localStorage.removeItem('Current_user')
        localStorage.setItem('Current_user',result)
      })
    })
  }

  // For removing friends from the "search" and "recommendations" areas
  // Use: const result = removeCommonElements(array1, array2); will return array that has only unique elements in array1
  removeCommonElements(array1: any[], array2: any[]): any[] {
    const set2 = new Set(array2);
    return array1.filter(element => !set2.has(element));
  }
}
