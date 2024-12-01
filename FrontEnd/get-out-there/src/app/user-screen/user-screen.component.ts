import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";//this imports the nav bar component into this file allowing its use here
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GetDataService } from '../../../services/get-data.service';
import {ObjectId} from 'mongodb';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-screen',
  standalone: true,
  imports: [NavigationBarComponent, NgFor, NgIf, CommonModule, FormsModule], //mentioning the objects to import from the imported components
  templateUrl: './user-screen.component.html',
  styleUrl: './user-screen.component.css'
})
export class UserScreenComponent implements OnInit{

  constructor(public dataService: GetDataService, private router:Router) { }
  public posts: any = []
  ngOnInit(): void {
    this.dataService.getPosts().subscribe((posts) => {
      this.posts = posts
    })
    console.log(this.USEROBJ);
  }
  public USEROBJ=JSON.parse(localStorage.getItem("Current_user")||"oops")
  public current_user:any=[
    {"usertype":"user", 
     
    }
  ]

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
        this.posts = posts
      })
    }
  }

  //Search by tag funciton
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
        this.posts = posts
      })
    }
  }
  //Search by user function
  onSearchUser(){
    console.log(this.USEROBJ._id)
    this.dataService.getPostsByUser(`${this.USEROBJ._id}`).subscribe((posts) => {
      this.posts = posts
    })
  }
}
