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
  
  postID!: string;// The ID of the post to edit
  public postToEdit!: string;// for holding all the information about the post to edit (to auto-fill the form at the start)

  public myObj!: Post;// for the parsing process when getting the existing information about the post to edit
  constructor(public dataService: GetDataService, private router: Router, private route: ActivatedRoute) {}

  // Values for storing the information of the existing post. Part of the process of putting the existing post information in the form
  //at the start.
  public caption : string = "Error retrieving value";
  public description : string = "Error retrieving value";
  public location : string = "Error retrieving value";
  public tags : Array<String> = [];
  
  // This allows it to grab the CURRENT date for a post!
  currentDate : Date = new Date();

  // Array of tags for the form
  tagsArray: any[] = [{ id: 1, itemName: 'Museum' }, 
                      { id: 2, itemName: 'Books' },
                      { id: 3, itemName: 'Coffee' },
                      { id: 4, itemName: 'History' },
                      { id: 5, itemName: 'Art' }
                    ]

  // The postForm object declaration
  postForm = new FormGroup({
    Caption: new FormControl(''),
    Description: new FormControl(''),
    Tags: new FormArray([]),
    LocationName: new FormControl(''),
    UserID: new FormControl(''),
    Date: new FormControl()
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
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postID = params['postid'];
    });


    this.postForm = new FormGroup({
      Caption: new FormControl(''),
      Description: new FormControl(''),
      Tags: new FormArray([]),
      LocationName: new FormControl(''),
      UserID: new FormControl(''),
      Date: new FormControl()
    });
    console.log("Test for reload!")

    let response = this.dataService.getPostInfo(this.postID).subscribe((postResult)=>{
      console.log("getting post data...")
      this.postToEdit = postResult;

      // parse the JSON object received
      this.myObj = JSON.parse(this.postToEdit);

      console.log("POST SEARCH RESULT (postToEdit):" + this.postToEdit)
      console.log("Post caption:", this.myObj.Caption)

      // Set the local variables to be the values obtained from the json
      this.caption = this.myObj.Caption;
      this.description = this.myObj.Description;
      this.location = this.myObj.LocationName;
      this.tags = this.myObj.Tags;

      console.log("Post caption part 2", this.description)

      // Immediately after getting these values, set the postform values (the whole point of this is so that when the user sees
      //this form, the value in each input box is the values from the post being edited)
      this.postForm.get("Caption")?.setValue(`${this.caption}`)
      this.postForm.get("Description")?.setValue(`${this.description}`)
      this.postForm.get("LocationName")?.setValue(`${this.location}`)
      //this.postForm.get("Tags")?.setValue(never)// working on implementing tags
    })

    
  }

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

      let response = this.dataService.editPost(this.postID, this.postForm.value).subscribe((result)=>{
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
