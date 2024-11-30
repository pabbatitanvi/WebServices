import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";//this imports the nav bar component into this file allowing its use here
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GetDataService } from '../../../services/get-data.service';
import {ObjectId} from 'mongodb';

@Component({
  selector: 'app-user-screen',
  standalone: true,
  imports: [NavigationBarComponent, NgFor, NgIf, CommonModule], //mentioning the objects to import from the imported components
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
    // console.log(this.USEROBJ);
  }
  // public USEROBJ=JSON.parse(localStorage.getItem("Current_user")||"oops")
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
  onEditPost(postID: ObjectId){
    this.router.navigate(['/posteditform/' + postID])
  }
}
