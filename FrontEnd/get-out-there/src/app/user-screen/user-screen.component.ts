import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";//this imports the nav bar component into this file allowing its use here
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GetDataService } from '../../../services/get-data.service';
import {ObjectId} from 'mongodb';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Post } from '../../models/post';

@Component({
  selector: 'app-user-screen',
  standalone: true,
  imports: [NavigationBarComponent, NgFor, NgIf, CommonModule, FormsModule, SidebarComponent], //mentioning the objects to import from the imported components
  templateUrl: './user-screen.component.html',
  styleUrl: './user-screen.component.css'
})
export class UserScreenComponent implements OnInit{

  // for getting user information from a post
  private myObj !: Post;
  // for storing a post temporarily while accessing its userId value
  private post !: string;

  constructor(public dataService: GetDataService, private router:Router) { }
  public posts: any = []
  ngOnInit(): void {

    this.dataService.getPosts().subscribe((posts) => {
      this.posts = posts
    })
    console.log(this.USEROBJ.chooseTags)
  }
  public USEROBJ=JSON.parse(localStorage.getItem("Current_user")||"oops")
  // public current_user:any=[
  //   {"usertype":"user", 
     
  //   }
  // ]

  onEventCreate(): void{
    this.router.navigate(['/postform'])
  }
  onDeletePost(postID: ObjectId){
    this.dataService.deletePosts(postID).subscribe((result)=>{})
    window.location.reload();
  }
  onEditPost(postID: string){
    
    // get the user id of the user who made the post
    this.dataService.getPostInfo(postID).subscribe((result)=>{
      
      console.log("getting post data...")
      this.post = result;

      // parse the JSON object received
      this.myObj = JSON.parse(this.post);

      console.log("POST SEARCH RESULT (postToEdit):" + this.post)
      console.log("Post userid:", this.myObj.UserId)

      if(this.USEROBJ._id != this.myObj.UserId){
        console.log("ACCESS DENIED")
      } else{
        console.log("Be my guest")
        this.router.navigate(['/posteditform/' + postID])
      }
    })


  }
  //Search by tag funciton
  selectedTag : string = "";
  onSearchTag(value:string){
    this.selectedTag = value;
    if(this.selectedTag=="All"){
      this.dataService.getPosts().subscribe((posts) => {
        this.posts = posts
      })
    } else{
      this.dataService.getPostsByTag(`${this.selectedTag}`).subscribe((posts) => {
        if(posts<=0){
          this.posts = [];
        } else{
          this.posts = posts
        }
      })
    }
  }

  //Search by location funciton
  selectedLocation : string = "";
  onSearchLocation(value:string){
    this.selectedLocation = value;
    console.log(value)
    if(this.selectedLocation=="All"){
      this.dataService.getPosts().subscribe((posts) => {
        this.posts = posts
      })
    } else{
      this.dataService.getPostsByLocation(`${this.selectedLocation}`).subscribe((posts) => {
        // honestly, this SHOULD happen on its own, but it didn't seem to so I had to take things into my own hands
        if(posts<=0){
          this.posts = [];
        } else{
          this.posts = posts
        }
      })
    }
  }
  //Search by user function
  onSearchUser(){
    console.log(this.USEROBJ._id)
    this.dataService.getPostsByUser(this.USEROBJ._id).subscribe((posts) => {
      // if function returned 0, set posts to be an empty array (should clear the screen of all posts)
      if(posts<=0){
        this.posts = [];
      } else{
        this.posts = posts
      }
    })
  }
}
