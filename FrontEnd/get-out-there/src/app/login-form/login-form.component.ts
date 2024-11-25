import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { GetDataService } from '../../../services/get-data.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(public dataService:GetDataService,private router:Router){}
  ngOnInit():void{
    localStorage.clear();

  }
  loginform=new FormGroup({

    username: new FormControl(''),
    password: new FormControl(' ')

  });
  

  onSubmit() {

     
       // Implement your login logic here
      let response = this.dataService.login(this.loginform.value).subscribe((result)=>{
      console.log("initial validation result log:",result)
      console.log("stored  in local")
      localStorage.setItem('Current_user',JSON.stringify(result))
      localStorage.setItem('LoggedinKey','true')
      this.router.navigate(['/home'])

        })
    // Add authentication logic and navigate to the next page upon successful login
}

}

