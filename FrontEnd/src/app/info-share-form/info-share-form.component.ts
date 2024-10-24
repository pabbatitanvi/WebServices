import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-info-share-form',
  templateUrl: './info-share-form.component.html',
  styleUrls: ['./info-share-form.component.scss']
})
export class InfoShareFormComponent implements OnInit{
  information_Form = new FormGroup({
    userEmail: new FormControl<string>(''),
    userName: new FormControl<string>(''),
    userOrg: new FormControl<string>('')
});

constructor() { }
ngOnInit(): void {
  this.information_Form.value.userEmail=""
  this.information_Form.value.userName=""
  this.information_Form.value.userEmail=""

}
  SaveData() 
  {

    let data = this.information_Form.value;
    console.log(data);
    // let c = this.dataService.checkUserEntry(data).subscribe((result) => {
    //   console.log("checking user accounts")
    //   console.log(result, '333333333333333333333333333333333333')
    //   if (result == true){
    //     return "FOUND"
    //   }
    //   else {
    //     this.dataService.enterUserData(data).subscribe(data => {
    //       console.log(data, '111111111111111111111111111111111111111111111111111111111111')
    //     })
    //     return "NOT FOUND"
    //   }
  }

}
