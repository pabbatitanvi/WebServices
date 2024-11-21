import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { FormsModule } from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, NgMultiSelectDropDownModule, FormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})

export class PostFormComponent implements OnInit{
  
  constructor(public dataService: GetDataService, private router: Router) { }
  ngOnInit(): void {
    
  }

  tagsArray: any[] = [{ id: 1, itemName: 'Museum' }, 
                      { id: 2, itemName: 'Books' },
                      { id: 3, itemName: 'Coffee' },
                      { id: 4, itemName: 'History' },
                      { id: 5, itemName: 'Art' }
                    ]

  postForm = new FormGroup({
    postName: new FormControl(''),
    description: new FormControl(''),
    chooseTags: new FormArray([]),
    location: new FormControl(''),
    userID: new FormControl('')

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
    return this.postForm.get('chooseTags') as FormArray;
  }
  onSelectedTags($event: any){
    console.log(':', $event)


    $event.forEach((tag: any) => {
      this.chooseTags.push(new FormControl(tag.itemName));
    })
  }
  
  // Called by the "submit" button, sends this to the middle-man (this.dataService) who sends it to the services
  onSubmit(){
    console.log(this.postForm.value)
    if(this.postForm.valid){
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
