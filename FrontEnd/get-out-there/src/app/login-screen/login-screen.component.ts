import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeScreenComponent } from '../home-screen/home-screen.component';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [HomeScreenComponent],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent implements OnInit{
  constructor(private router:Router){}
  ngOnInit(): void {
    
  }
  onLogin(): void{
    this.router.navigate(['/home-screen'])
  }
}
