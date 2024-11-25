import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { FormsModule } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, NgMultiSelectDropDownModule, FormsModule],

  templateUrl: './post-edit-form.component.html',
  styleUrl: './post-edit-form.component.css'
})

export class PostEditFormComponent implements OnInit{
  
  postID!: string;
  public postToEdit!: string;
  public myObj!: Post;
  constructor(public dataService: GetDataService, private router: Router, private route: ActivatedRoute) {}

  public caption !: string;
  // public location: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postID = params['postid'];
    });

    let response = this.dataService.getPostInfo(this.postID).subscribe((postResult)=>{
      console.log("getting post data...")
      this.postToEdit = postResult;
      this.myObj = JSON.parse(this.postToEdit);
      console.log("POST SEARCH RESULT (postToEdit):" + this.postToEdit)
      console.log("Post caption:", this.myObj.Caption)
      this.caption = this.myObj.Caption;
    })
  }

  // This allows it to grab the CURRENT date for a post!
  currentDate : Date = new Date();

  tagsArray: any[] = [{ id: 1, itemName: 'Museum' }, 
                      { id: 2, itemName: 'Books' },
                      { id: 3, itemName: 'Coffee' },
                      { id: 4, itemName: 'History' },
                      { id: 5, itemName: 'Art' }
                    ]

  postForm = new FormGroup({
    Caption: new FormControl(this.caption),
    Description: new FormControl(''),
    Tags: new FormArray([]),
    LocationName: new FormControl(''),
    UserID: new FormControl(''),
    Date: new FormControl(this.currentDate)
  });

  selected: any[] = [{ id: 1, itemName: 'Museum' }]

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'itemName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true
  };
  
  get chooseTags():FormArray{
    return this.postForm.get('Tags') as FormArray;
  }
  onSelectedTags($event: any){
    console.log(':', $event)


    if(Array.isArray($event)){
      $event.forEach((tag: any) => {
        this.chooseTags.push(new FormControl(tag.itemName));
      })
    }
    else{
      this.chooseTags.push(new FormControl($event.itemName));
    }
  }
  
  // Called by the "submit" button, sends this to the middle-man (this.dataService) who sends it to the services
  onSubmit(){
    console.log(this.postForm.value)
    if(this.postForm.valid){

      // CHANGE TO MODIFY SERVICE!
      let response = this.dataService.createNewPost(this.postForm.value).subscribe((result)=>{
        console.log("post was sent to the middle man")
      })
    }
    else{
      console.log("Something went wrong! Post was not sent.")
    }
    this.router.navigate(['/userprofile'])
  }
  // Called by the "close" button, navigates back to the user profile
  onQuit(){
    this.router.navigate(['/userprofile'])
  }
}
