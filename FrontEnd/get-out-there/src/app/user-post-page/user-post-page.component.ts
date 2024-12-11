import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";//this imports the nav bar component into this file allowing its use here
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GetDataService } from '../../../services/get-data.service';
import { ObjectId } from 'mongodb';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-user-post-page',
  standalone: true,
  imports: [NavigationBarComponent, NgFor, NgIf, CommonModule, FormsModule, SidebarComponent],
  templateUrl: './user-post-page.component.html',
  styleUrl: './user-post-page.component.css'
})
export class UserPostPageComponent implements OnInit {

  constructor(public dataService: GetDataService, private router:Router) { }
  public posts: any = []
  ngOnInit(): void {
    this.dataService.getPosts().subscribe((posts) => {
      this.posts = posts
    })
  }
  public USEROBJ=JSON.parse(localStorage.getItem("Current_user")||"oops")

  onEventCreate(): void{
    this.router.navigate(['/postform'])
  }
  onDeletePost(postID: ObjectId){
    this.dataService.deletePosts(postID).subscribe((result)=>{})
    window.location.reload();
  }
  onEditPost(postID: ObjectId){
    this.router.navigate(['/posteditform/' + postID])
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
